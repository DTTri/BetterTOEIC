import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ChatMessage } from '~/models/Chat';
import { SWTestContent } from '~/models/SWTestContent';

class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
    this.bucketName = process.env.AWS_BUCKET_NAME || 'bettertoeic-uploads';
  }

  private generateTestContentKey(userId: string, testId: string): string {
    return `users/${userId}/tests/${testId}/content.json`;
  }

  private generateAudioKey(userId: string, testId: string, questionNumber: number, format: string = 'webm'): string {
    return `users/${userId}/tests/${testId}/audio/${questionNumber}.${format}`;
  }

  async uploadAudio(userId: string, testId: string, questionNumber: number, audioData: Buffer): Promise<string> {
    const isWebM = this.detectWebMFormat(audioData);
    const format = isWebM ? 'webm' : 'mp3';
    const contentType = isWebM ? 'audio/webm' : 'audio/mp3';

    console.log(`Uploading audio for question ${questionNumber} as ${format} format (${contentType})`);

    const key = this.generateAudioKey(userId, testId, questionNumber, format);

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: audioData,
        ContentType: contentType,
      })
    );

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  private detectWebMFormat(audioData: Buffer): boolean {
    if (audioData.length < 4) {
      return false;
    }

    if (audioData[0] === 0x1a && audioData[1] === 0x45 && audioData[2] === 0xdf && audioData[3] === 0xa3) {
      console.log('Detected WebM format audio');
      return true;
    }

    const headerStr = Buffer.from(audioData.buffer, audioData.byteOffset, Math.min(50, audioData.length)).toString(
      'hex'
    );
    if (headerStr.includes('1a45dfa3') || headerStr.includes('webm')) {
      console.log('Detected WebM format audio (alternative signature)');
      return true;
    }

    if (audioData.length > 10) {
      const possibleUrl = Buffer.from(
        audioData.buffer,
        audioData.byteOffset,
        Math.min(100, audioData.length)
      ).toString();
      if (possibleUrl.includes('webm')) {
        console.log('Detected WebM format from URL');
        return true;
      }
    }

    console.log(
      'Audio format header bytes:',
      Buffer.from(audioData.buffer, audioData.byteOffset, Math.min(16, audioData.length)).toString('hex')
    );

    return false;
  }

  async uploadTestContent(userId: string, testContent: SWTestContent): Promise<string> {
    const key = this.generateTestContentKey(userId, testContent.testId);

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: JSON.stringify(testContent),
        ContentType: 'application/json',
      })
    );

    return key;
  }

  async getTestContent(contentKey: string): Promise<SWTestContent> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: contentKey,
    });

    const response = await this.s3Client.send(command);
    const bodyContents = await response.Body?.transformToString();

    if (!bodyContents) {
      throw new Error('Failed to retrieve test content from S3');
    }

    return JSON.parse(bodyContents) as SWTestContent;
  }

  private generateChatArchiveKey(userId: string, archiveId: string): string {
    return `users/${userId}/chat-archives/${archiveId}.json`;
  }

  async uploadChatArchive(userId: string, archiveId: string, dataChat: ChatMessage[]): Promise<string> {
    const key = this.generateChatArchiveKey(userId, archiveId);
    const archiveData = {
      messages: dataChat,
      createdAt: new Date().toISOString(),
    };

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: JSON.stringify(archiveData),
        ContentType: 'application/json',
      })
    );
    return key;
  }

  async getChatArchive(key: string): Promise<any> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    const bodyContents = await response.Body?.transformToString();

    if (!bodyContents) {
      throw new Error('Failed to retrieve chat archive from S3');
    }

    return JSON.parse(bodyContents);
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  async deleteObject(key: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })
    );
  }
}

const s3ServiceInstance = new S3Service();
export default s3ServiceInstance;

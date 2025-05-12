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

  private generateAudioKey(userId: string, testId: string, questionNumber: number): string {
    return `users/${userId}/tests/${testId}/audio/${questionNumber}.mp3`;
  }

  async uploadAudio(userId: string, testId: string, questionNumber: number, audioData: Buffer): Promise<string> {
    const key = this.generateAudioKey(userId, testId, questionNumber);

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: audioData,
        ContentType: 'audio/mp3',
      })
    );

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
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

  //Upload chat archive to S3
   async uploadChatArchive(userId: string, archiveId: string, dataChat: ChatMessage[]): Promise<string> {
    const key = this.generateChatArchiveKey(userId, archiveId);
    const archiveData = {
      messages: dataChat,
      createdAt: new Date().toISOString()
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

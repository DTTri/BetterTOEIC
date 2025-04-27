import dialogflow from '@google-cloud/dialogflow';
import { SessionsClient } from '@google-cloud/dialogflow';
import dotenv from 'dotenv';
import path from 'path';
import { DialogflowResponse } from '~/models/Chat';

dotenv.config();

class DialogflowService {
  private sessionClient: SessionsClient;
  private projectId: string;

  constructor() {
    // const privateKey = process.env.DIALOGFLOW_PRIVATE_KEY
    //   ? process.env.DIALOGFLOW_PRIVATE_KEY.split(String.raw`\n`).join('\n')
    //   : '';

    // const credentials = {
    //   type: process.env.DIALOGFLOW_TYPE,
    //   project_id: process.env.DIALOGFLOW_PROJECT_ID,
    //   private_key_id: process.env.DIALOGFLOW_PRIVATE_KEY_ID,
    //   private_key: privateKey,
    //   client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
    //   client_id: process.env.DIALOGFLOW_CLIENT_ID,
    //   auth_uri: process.env.DIALOGFLOW_AUTH_URI,
    //   token_uri: process.env.DIALOGFLOW_TOKEN_URI,
    //   auth_provider_x509_cert_url: process.env.DIALOGFLOW_AUTH_PROVIDER_CERT_URL,
    //   client_x509_cert_url: process.env.DIALOGFLOW_CLIENT_CERT_URL
    // };

    // this.projectId = process.env.DIALOGFLOW_PROJECT_ID || '';



    try {
      // Sử dụng file credentials trực tiếp
      const keyFilePath = path.resolve(__dirname, '../config/diagflow-credentials.json');
      
      this.sessionClient = new dialogflow.SessionsClient({
        keyFilename: keyFilePath
      });

      // Lấy project ID từ credentials file
      const credentials = require(keyFilePath);
      this.projectId = credentials.project_id;

    } catch (error) {
      console.error('Error initializing Dialogflow client:', error);
      throw new Error('Failed to initialize Dialogflow service');
    }
  }

  async detectIntent(sessionId: string, queryText: string, languageCode = 'vi'): Promise<DialogflowResponse> {
    try {
      const sessionPath = this.sessionClient.projectAgentSessionPath(
        this.projectId,
        sessionId
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: queryText,
            languageCode,
          },
        },
      };

      const [response] = await this.sessionClient.detectIntent(request);
      const result = response.queryResult;

      if (!result) {
        return {
          intent: '',
          confidence: 0,
          response: 'Không có phản hồi từ Dialogflow.',
          matched: false,
        };
      }

      // Xử lý payload từ Dialogflow
      const payload = result.fulfillmentMessages?.[0]?.payload?.fields;
      const parameters = {
        url: payload?.url?.stringValue || '',
        responseText: payload?.responseText?.stringValue || ''
      };

      return {
        intent: result.intent?.displayName || '',
        confidence: result.intentDetectionConfidence || 0,
        response: result.fulfillmentText || '',
        parameters: parameters,
        matched: !!result.intent?.displayName,
      };
    } catch (error) {
      console.error('Error detecting intent:', error);
      return {
        intent: '',
        confidence: 0,
        response: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn.',
        matched: false,
      };
    }
  }
}

export const dialogflowService = new DialogflowService();

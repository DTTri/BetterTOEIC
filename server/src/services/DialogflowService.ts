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

    try {
      const credentials = {
        "type": process.env.DIALOGFLOW_TYPE,
        "project_id": process.env.DIALOGFLOW_PROJECT_ID,
        "private_key_id": process.env.DIALOGFLOW_PRIVATE_KEY_ID,
        "private_key": process.env.DIALOGFLOW_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        "client_email": process.env.DIALOGFLOW_CLIENT_EMAIL,
        "client_id": process.env.DIALOGFLOW_CLIENT_ID,
        "auth_uri": process.env.DIALOGFLOW_AUTH_URI,
        "token_uri": process.env.DIALOGFLOW_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.DIALOGFLOW_AUTH_PROVIDER_CERT_URL,
        "client_x509_cert_url": process.env.DIALOGFLOW_CLIENT_CERT_URL,
      };

      this.sessionClient = new dialogflow.SessionsClient({
        credentials: credentials
      });

      this.projectId = process.env.DIALOGFLOW_PROJECT_ID || '';

      if (!this.projectId) {
        throw new Error('DIALOGFLOW_PROJECT_ID is not defined in environment variables');
      }

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
          response: 'No response generated.',
          matched: false,
        };
      }

      // Xử lý payload từ Dialogflow
      const payload = result.fulfillmentMessages?.[0]?.payload?.fields;
      const parameters = {
        url: payload?.url?.stringValue || '',
        responseText: payload?.responseText?.stringValue || ''
      };

      const isMatched = !!(result.intent?.displayName && result.intent.isFallback !== true);

      return {
        intent: result.intent?.displayName || '',
        confidence: result.intentDetectionConfidence || 0,
        response: result.fulfillmentText || '',
        parameters: parameters,
        matched: isMatched,
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

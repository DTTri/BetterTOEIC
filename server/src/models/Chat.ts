export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  created_at: string;
} 

export interface ChatHistory {
  userId: string;
  chats: ChatMessage[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalMessages: number;
    hasMore: boolean;
  }
}

export interface DialogflowResponse {
  intent: string;
  confidence: number;
  response: string;
  parameters?: {
    url?: string;
    resourcePath?: string; 
    responseText?: string;
  };
  matched: boolean;
  error?: string;
}

export interface GPTResponse {
  content: string;
  error?: string;
}

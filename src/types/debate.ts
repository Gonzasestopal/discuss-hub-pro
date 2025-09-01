export interface Message {
  id: number;
  content: string;
  side: 'pro' | 'con';
  timestamp: string;
  conversation_id: number;
}

export interface Conversation {
  id: number;
  topic: string;
  created_at: string;
  message_count: number;
  last_activity: string;
  side: 'pro' | 'con' | null;
}

export interface ApiMessage {
  role: 'user' | 'bot';
  message: string;
}

export interface ConversationDetailResponse {
  conversation_id: number;
  message: ApiMessage[];
  side: 'pro' | 'con';
  topic: string;
  created_at: string;
  last_activity: string | null;
  message_count: number | null;
}

export interface ApiPayload {
  message: string;
  conversation_id: number;
}
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
}

export interface ApiPayload {
  message: string;
  conversation_id: number;
}
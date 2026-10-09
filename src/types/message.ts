export interface IMessage {
  id: string;
  content: string;
  sender: 'me' | 'other';
  timestamp: number;
}
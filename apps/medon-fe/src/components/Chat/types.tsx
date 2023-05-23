import { Socket } from 'socket.io-client';

export interface IChatProps {
  messages: ChatMessage[];
  onSubmit: (message: string) => void;
}

export interface ChatMessage {
  id: number;
  value: string;
  appointment: Object;
  sender: { lastName: string };
  recipient: Object;
  createdAt: Date;
  updatedAt: Date;
}

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from 'components/Chat/types';

interface ISocket {
  history: ChatMessage[];
  isHistoryReady: boolean;
  reply: ChatMessage | null;
  onSubmitMessage: (msg: string) => void;
}

interface ISocketProps {
  appointmentId: number;
  senderId: number;
}

export function useSocket({ appointmentId, senderId }: ISocketProps): ISocket {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [isHistoryReady, setIsHistoryReady] = useState<boolean>(false);
  const [reply, setReply] = useState<ChatMessage | null>(null);

  useEffect(() => {
    const socket = io(`${process.env.NX_API_URL}/chat`);

    socket.emit('joinRoomByAppointmentId', appointmentId);
    socket.emit('getAllMessages', {}, (response: ChatMessage[]) => {
      setHistory(response);
      setIsHistoryReady(true);
    });

    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket?.on('message', (message: ChatMessage) => {
      setReply(message);
    });
  }, [socket]);

  const onSubmitMessage = (message: string): void => {
    socket?.emit('sendMessage', {
      value: message,
      appointmentId,
      senderId,
    });
  };

  return { history, isHistoryReady, onSubmitMessage, reply };
}

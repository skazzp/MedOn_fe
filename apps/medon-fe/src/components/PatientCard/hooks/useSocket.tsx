import { EventHandler, MouseEvent, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from 'components/Chat/types';

interface ISocket {
  socket: Socket | null;
  messages: ChatMessage[];
  onSubmitMessage: (msg: string) => void;
}

interface ISocketProps {
  appointmentId: number;
  senderId: number;
}

export function useSocket({ appointmentId, senderId }: ISocketProps): ISocket {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const socket = io(`${process.env.NX_API_URL}/chat`);

    socket.emit('joinRoomByAppointmentId', appointmentId);
    socket.emit('getAllMessages', {}, (response: ChatMessage[]) => {
      setMessages(response);
    });

    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket?.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  const onSubmitMessage = (message: string): void => {
    console.log(message);
    socket?.emit('sendMessage', {
      value: message,
      appointmentId,
      senderId,
    });
  };

  return { socket, messages, onSubmitMessage };
}

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { InputAntD, TextareaAntD } from 'components/common';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { Wrapper } from './styles';

const Chat = () => {
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');
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

  useEffect(() => {
    const chatText = messages.reduce(
      (acc, message) =>
        acc +
        `[${new Date(message.createdAt).toLocaleTimeString()}] ${
          message.sender.lastName
        }: ${message.value}\n`,
      ''
    );

    setValue('messages', chatText);
  }, [messages]);

  const onChatOpen = () => {
    socket?.emit('joinRoomByAppointmentId', 3);
    socket?.emit('getAllMessages', {}, (response: any) => {
      setMessages(response);
    });
  };

  const onSubmitHandler = () => {
    socket?.emit('sendMessage', {
      value: getValues('message'),
      appointment: 3,
      sender: 1,
      recipient: 2,
    });
  };

  return (
    <Wrapper>
      <form
        name="contact"
        method="post"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextareaAntD name="messages" minRows={12} control={control} />
        <InputAntD
          name="message"
          placeholder="enter message"
          control={control}
        ></InputAntD>
        <Button htmlType="submit">Send</Button>
        <Button onClick={onChatOpen}>Join Chat</Button>
      </form>
    </Wrapper>
  );
};

export default Chat;

import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { InputAntD, TextareaAntD } from 'components/common';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';

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
    setValue('messages', JSON.stringify(messages));
  }, [messages]);

  const onChatOpen = () => {
    socket?.emit('joinRoom', 3);
  };

  const onSubmitHandler = () => {
    socket?.emit('sendMessage', {
      message: getValues('message'),
      appointment: 3,
      sender: 1,
      recipient: 2,
    });
  };

  return (
    <div>
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
    </div>
  );
};

export default Chat;

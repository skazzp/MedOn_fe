import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { InputAntD, TextareaAntD } from 'components/common';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { IChatProps } from 'components/Chat/types';
import { messagesToText } from 'components/Chat/utils/messagesToText';
import { Wrapper } from './styles';

const Chat = ({ messages, onSubmit }: IChatProps) => {
  const { control, handleSubmit, getValues, setValue } = useForm();

  useEffect(() => {
    const chatText = messagesToText(messages);
    setValue('messages', chatText);
  }, [messages]);

  const onSubmitHandler = () => {
    onSubmit(getValues('message'));
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
      </form>
    </Wrapper>
  );
};

export default Chat;

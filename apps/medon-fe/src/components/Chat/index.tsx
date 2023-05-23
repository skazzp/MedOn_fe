import React, { useEffect } from 'react';
import { addResponseMessage, addUserMessage } from 'react-chat-widget';
import { Widget } from 'react-chat-widget';
import { ChatMessage } from 'components/Chat/types';
import { dataToChatMessage } from 'components/Chat/utils/dataToChatMessage';
import 'react-chat-widget/lib/styles.css';
import { GlobalStyle } from './styles';

export interface IChatProps {
  onSubmitMessage: (message: string) => void;
  history: ChatMessage[];
  reply: ChatMessage | null;
}

export function Chat({ onSubmitMessage, history, reply }: IChatProps) {
  useEffect(() => {
    history.forEach((message) => {
      // TODO: replace with real user.id
      if (message.sender.id === 1) addUserMessage(dataToChatMessage(message));
      else {
        addResponseMessage(dataToChatMessage(message));
      }
    });
  }, []);

  useEffect(() => {
    if (reply) addResponseMessage(dataToChatMessage(reply));
  }, [reply]);

  return (
    <>
      <GlobalStyle />
      <Widget
        title="MedON"
        subtitle="Appointment chat"
        senderPlaceHolder="Type a message..."
        handleNewUserMessage={onSubmitMessage}
        showTimeStamp={false}
      />
    </>
  );
}

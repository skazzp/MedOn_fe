import React, { useEffect } from 'react';
import {
  Widget,
  addResponseMessage,
  addUserMessage,
  dropMessages,
  renderCustomComponent,
} from 'react-chat-widget';
import { ChatMessage } from 'components/Chat/types';
import 'react-chat-widget/lib/styles.css';
import { GlobalStyle } from './styles';
import dayjs from 'dayjs';
import { IUser } from 'redux/api/types';

export interface IChatProps {
  onSubmitMessage: (message: string) => void;
  history: ChatMessage[];
  reply: ChatMessage | null;
  user: IUser;
  patientFullName?: string;
}

function CustomTimeStampFragment({ date }: { date: Date }) {
  return (
    <div style={{ fontSize: 12, marginTop: -4 }}>
      {dayjs(date).format('hh:mm')}
    </div>
  );
}

export function Chat({
  onSubmitMessage,
  history,
  reply,
  user,
  patientFullName,
}: IChatProps) {
  useEffect(() => {
    history.forEach((message) => {
      if (message.sender.id === Number(user.id)) {
        addUserMessage(message.value);
        renderCustomComponent(CustomTimeStampFragment, {
          date: message.createdAt,
        });
      } else {
        addResponseMessage(
          `**Dr. ${message.sender.lastName}:** ${message.value}`
        );
        renderCustomComponent(CustomTimeStampFragment, {
          date: message.createdAt,
        });
      }
    });
    return () => dropMessages();
  }, []);

  useEffect(() => {
    if (reply) {
      addResponseMessage(`**Dr. ${reply.sender.lastName}:** ${reply.value}`);
      renderCustomComponent(CustomTimeStampFragment, {
        date: reply.createdAt,
      });
    }
  }, [reply]);

  const handleNewUserMessage = (message: string) => {
    onSubmitMessage(message);
    renderCustomComponent(CustomTimeStampFragment, { date: new Date() });
  };

  return (
    <>
      <GlobalStyle />
      <Widget
        title="Appointment chat"
        subtitle={`Patient: ${patientFullName}`}
        senderPlaceHolder="Type a message..."
        handleNewUserMessage={handleNewUserMessage}
        showTimeStamp={false}
        emojis={true}
      />
    </>
  );
}

import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Widget,
  addResponseMessage,
  addUserMessage,
  dropMessages,
  renderCustomComponent,
} from 'react-chat-widget';
import { useTranslation } from 'react-i18next';
import { IChatProps, ICustomTimeStampProps } from 'components/Chat/types';
import 'react-chat-widget/lib/styles.css';
import { GlobalStyle, DateWrapper, DateWrapperReply } from './styles';

function CustomTimeStampFragment({ date, isReply }: ICustomTimeStampProps) {
  return (
    <>
      {isReply ? (
        <DateWrapperReply>{dayjs(date).format('hh:mm')}</DateWrapperReply>
      ) : (
        <DateWrapper>{dayjs(date).format('hh:mm')}</DateWrapper>
      )}
    </>
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
          isReply: false,
        });
      } else {
        addResponseMessage(
          `**${t('chat.doctor.prefix')} ${message.sender.lastName}:** ${
            message.value
          }`
        );
        renderCustomComponent(CustomTimeStampFragment, {
          date: message.createdAt,
          isReply: true,
        });
      }
    });
    return () => dropMessages();
  }, []);

  useEffect(() => {
    if (reply) {
      addResponseMessage(
        `**${t('chat.doctor.prefix')} ${reply.sender.lastName}:** ${
          reply.value
        }`
      );
      renderCustomComponent(CustomTimeStampFragment, {
        date: reply.createdAt,
        isReply: true,
      });
    }
  }, [reply]);

  const handleNewUserMessage = (message: string) => {
    onSubmitMessage(message);
    renderCustomComponent(CustomTimeStampFragment, { date: new Date() });
  };

  const { t } = useTranslation();

  return (
    <>
      <GlobalStyle />
      <Widget
        title={t('chat.title')}
        subtitle={`${t('chat.subtitle.prefix')} ${patientFullName}`}
        senderPlaceHolder={t('chat.placeholder')}
        handleNewUserMessage={handleNewUserMessage}
        showTimeStamp={false}
        emojis={true}
      />
    </>
  );
}

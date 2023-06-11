import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Widget,
  addResponseMessage,
  addUserMessage,
  dropMessages,
  renderCustomComponent,
  markAllAsRead,
} from 'react-chat-widget';
import { useTranslation } from 'react-i18next';
import { IChatProps, ICustomTimeStampProps } from 'components/Chat/types';
import { timeFormat } from 'utils/constants';
import { GlobalStyle, DateWrapperReply, DateWrapperMessage } from './styles';
import 'react-chat-widget/lib/styles.css';

function CustomTimeStampFragment({ date, isReply }: ICustomTimeStampProps) {
  return (
    <>
      {isReply ? (
        <DateWrapperReply>{dayjs(date).format(timeFormat)}</DateWrapperReply>
      ) : (
        <DateWrapperMessage>
          {dayjs(date).format(timeFormat)}
        </DateWrapperMessage>
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
  const { t } = useTranslation();

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
      markAllAsRead();
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
        launcherOpenImg="assets/svgs/patientCard/chat-white.svg"
      />
    </>
  );
}

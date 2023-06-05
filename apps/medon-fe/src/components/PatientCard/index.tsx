import React, { useState } from 'react';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';
import { toggleWidget } from 'react-chat-widget';

import { ChatIcon, Edit } from 'assets/svgs/patientCard';

import { LinkGoBack } from 'components/common/LinkGoBack';
import PatientCardInfo from 'components/PatientCardInfo';
import { ShowMore } from 'components/ShowMore';
import { NewPatientForm } from 'components/NewPatientForm';
import { Chat } from 'components/Chat';
import { useSocket } from 'components/PatientCard/hooks/useSocket';

import { useAppSelector } from 'redux/hooks';
import { useGetPatientByIdQuery } from 'redux/api/patientApi';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { getNotification } from 'redux/features/notificationSlice/notificationSlice';

import {
  Container,
  Top,
  SkeletonContainer,
  EditBtn,
  StyledButton,
} from './styles';

export default function PatientCard() {
  const [editInfo, setEditInfo] = useState<boolean>(false);

  const { id } = useParams();
  const { t } = useTranslation();

  const { data: patient, isLoading: isPatientLoading } = useGetPatientByIdQuery(
    { id }
  );

  const user = useAppSelector(getUserSelector);

  const { currentAppointment } = useAppSelector(getNotification);

  const { history, onSubmitMessage, isHistoryReady, reply } = useSocket({
    appointmentId: currentAppointment?.id,
    userId: user.id,
  });

  if (isPatientLoading)
    return (
      <SkeletonContainer>
        <Skeleton active avatar round />
        <Skeleton active title />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
      </SkeletonContainer>
    );

  return (
    <Container>
      {!editInfo ? (
        <>
          <Top>
            <LinkGoBack>{t('patient-card.link-back')}</LinkGoBack>
            <EditBtn onClick={() => setEditInfo(true)}>
              {t('patient-card.edit')}
              <Edit />
            </EditBtn>
          </Top>
          <PatientCardInfo {...patient?.data} />
          {currentAppointment?.patientId === patient?.data?.id &&
            isHistoryReady && (
              <StyledButton size="large" onClick={toggleWidget}>
                <span>Chat</span>
                <ChatIcon />
              </StyledButton>
            )}
          <h4>{t('patient-card.overview')}</h4>
          <ShowMore text={patient?.data?.overview} />
          <Outlet />
        </>
      ) : (
        <NewPatientForm patient={patient?.data} setEditInfo={setEditInfo} />
      )}
      {currentAppointment?.patientId === patient?.data?.id &&
        isHistoryReady && (
          <Chat
            onSubmitMessage={onSubmitMessage}
            history={history}
            reply={reply}
            user={user}
            patientFullName={`${patient?.data?.firstName} ${patient?.data?.lastName}`}
          />
        )}
    </Container>
  );
}

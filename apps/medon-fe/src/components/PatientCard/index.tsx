import { useState } from 'react';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';

import { Edit } from 'assets/svgs/patientCard';

import { LinkGoBack } from 'components/common/LinkGoBack';
import PatientCardInfo from 'components/PatientCardInfo';
import { ShowMore } from 'components/ShowMore';
import { NewPatientForm } from 'components/NewPatientForm';
import { Chat } from 'components/Chat';
import { useSocket } from 'components/PatientCard/hooks/useSocket';

import { useGetPatientByIdQuery } from 'redux/api/patientApi';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';

import { Container, Top, SkeletonContainer, EditBtn } from './styles';
import { useAppSelector } from 'redux/hooks';

export default function PatientCard() {
  const [editInfo, setEditInfo] = useState<boolean>(false);

  const { id } = useParams();
  const { t } = useTranslation();

  const { data: patient, isLoading: isPatientLoading } = useGetPatientByIdQuery(
    { id }
  );

  const user = useAppSelector(getUserSelector);

  //TODO: Replace with real appointmentId and user.id
  const { history, onSubmitMessage, isHistoryReady, reply } = useSocket({
    appointmentId: 3,
    senderId: Number(user.id),
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
          <h4>{t('patient-card.overview')}</h4>
          <ShowMore text={patient?.data?.overview} />
          <Outlet />
        </>
      ) : (
        <NewPatientForm patient={patient?.data} setEditInfo={setEditInfo} />
      )}
      {isHistoryReady && (
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

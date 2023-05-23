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

import { Container, Top, SkeletonContainer, EditBtn } from './styles';

export default function PatientCard() {
  const [editInfo, setEditInfo] = useState<boolean>(false);

  const { id } = useParams();
  const { t } = useTranslation();

  const { data: patient, isLoading: isPatientLoading } = useGetPatientByIdQuery(
    { id }
  );

  //TODO: Replace with real appointmentId and user.id
  const { history, onSubmitMessage, isHistoryReady, reply } = useSocket({
    appointmentId: 3,
    senderId: 1,
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
        />
      )}
    </Container>
  );
}

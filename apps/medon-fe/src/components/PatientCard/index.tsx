import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useParams } from 'react-router-dom';

import { Edit } from 'assets/svgs/patientCard';

import { LinkGoBack } from 'components/common/LinkGoBack';
import PatientCardInfo from 'components/PatientCardInfo';
import { ShowMore } from 'components/ShowMore';

import { useGetPatientByIdQuery } from 'redux/api/patientApi';

import { Container, Top, SkeletonContainer } from './styles';

export default function PatientCard() {
  const { id } = useParams();

  const { data: patient, isLoading: isPatientLoading } = useGetPatientByIdQuery(
    { id }
  );

  const { t } = useTranslation();

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
      <Top>
        <LinkGoBack>{t('patient-card.link-back')}</LinkGoBack>
        <Link to="#">
          {t('patient-card.edit')}
          <Edit />
        </Link>
      </Top>
      <PatientCardInfo {...patient?.data} />
      <h4>{t('patient-card.overview')}</h4>
      <ShowMore text={patient?.data?.overview} />
      <Outlet />
    </Container>
  );
}

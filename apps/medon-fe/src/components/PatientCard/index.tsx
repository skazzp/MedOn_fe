import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';

import { Edit } from 'assets/svgs/patientCard';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useParams,  } from 'react-router-dom';
import AnimateHeight, { Height } from 'react-animate-height';
import { toast } from 'react-toastify';

import { LinkGoBack } from 'components/common/LinkGoBack';
import PatientCardInfo from 'components/PatientCardInfo';
import { ShowMore } from 'components/ShowMore';
import { NewPatientForm } from 'components/NewPatientForm';

import { useGetPatientByIdQuery } from 'redux/api/patientApi';
import { Container, Top, SkeletonContainer } from './styles';

export default function PatientCard() {

import { useDebounce } from 'hooks/useDebounce';
import { defaultOrder, defaultPage, defaultPageSize } from 'utils/constants';

import {
  AddNoteForm,
  Buttons,
  Calendar,
  Container,
  StyledSelect,
  Top,
  Wrapper,
  SkeletonContainer,
  EditBtn,
} from './styles';
import { SubmitAddNote } from './types';

export default function PatientCard() {
  const [height, setHeight] = useState<Height>(0);
  const [textValue, setTextValue] = useState<string>('');
  const [editInfo, setEditInfo] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || defaultPage;
  const limit = Number(searchParams.get('limit')) || defaultPageSize;
  const order = searchParams.get('order') || defaultOrder;

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
          <Button
            isfullwidth="true"
            textcolor={theme.colors.blue_500}
            bgcolor={theme.colors.blue_100}
            onClick={() => setHeight(height === 0 ? 'auto' : 0)}
          >
            {t('patient-card.button')}
          </Button>
          <AnimateHeight height={height}>
            <AddNoteForm onSubmit={handleSubmit(handleAddNote)}>
              <TextareaAntD
                name="note"
                control={control}
                minRows={6}
                placeholder={`${t('patient-card.notes.placeholder')}`}
              />
              <Buttons>
                <Button
                  textcolor={theme.colors.white}
                  bgcolor={theme.colors.btnGradient}
                  isLoading={isNoteSending}
                >
                  {t('patient-card.notes.add-button')}
                  <AddNote />
                </Button>
                <Button
                  type="button"
                  textcolor={theme.colors.gray_700}
                  bgcolor={theme.colors.gray_400}
                  onClick={() => setHeight(height === 0 ? 'auto' : 0)}
                >
                  <Close />
                  {t('patient-card.notes.cancel-button')}
                </Button>
              </Buttons>
            </AddNoteForm>
          </AnimateHeight>
          <h5>{t('patient-card.medical')}</h5>
          <Wrapper>
            <Input.Search
              size="large"
              placeholder={`${t('patient-card.search-input-placeholder')}`}
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
              loading={isFetching}
            />
            <StyledSelect
              defaultValue={defaultOrder}
              options={options}
              size="large"
              onChange={(changeText) => {
                setSearchParams({ order: changeText as string });
              }}
            />
          </Wrapper>
          <PatientNotes
            isFetching={isFetching}
            notes={notes?.data?.notes}
            total={notes?.data?.total}
          />
        </>
      ) : (
        <NewPatientForm patient={patient?.data} setEditInfo={setEditInfo} />
      )}
    </Container>
  );
}

import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CountryCode } from 'libphonenumber-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

import { genderOption, routes } from 'utils/constants/';
import { toastConfig } from 'utils/toastConfig';
import { countryOptionsWithCode } from 'utils/countries/countryOptions';
import { newPatientSchema } from 'validation/newPatientSchema';
import { IServerError } from 'interfaces/serverResponse';
import { ICreatePatient } from 'interfaces/patients';
import { useCreatePatientMutation } from 'redux/api/patientApi';

import {
  LinkGoBack,
  InputAntD,
  SelectAntD,
  DatepickerAntD,
  TextareaAntD,
  InputPhoneNumber,
} from 'components/common/';

import {
  Container,
  StyledForm,
  ButtonsWrapper,
  Header,
  Label,
  StyledButton,
  SectionWrapper,
  InputsWrapper,
  InputWrapper,
} from './styles';

export function NewPatientForm() {
  const { control, handleSubmit, watch, getValues, reset } =
    useForm<ICreatePatient>({
      mode: 'onBlur',
      resolver: yupResolver(newPatientSchema),
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        country: 'UA',
        dateOfBirth: undefined,
        gender: undefined,
        phoneNumber: '',
        overview: '',
      },
    });

  const [createPatient, { isLoading }] = useCreatePatientMutation();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const submitForm = async (dto: ICreatePatient): Promise<void> => {
    try {
      const dateOfBirth = new Date(dto.dateOfBirth);

      const { data } = await createPatient({
        ...dto,
        dateOfBirth,
      }).unwrap();
      if (data) navigate(routes.patientCard + `/${data.id}`);
      toast.success(t('new-patient.info.success'), toastConfig);
    } catch (err) {
      const msg = (err as IServerError).data.message;

      toast.error(Array.isArray(msg) ? msg[0] : msg, toastConfig);
    }
  };

  watch('country');

  return (
    <>
      <LinkGoBack>{t('new-patient.back-link')}</LinkGoBack>
      <Container>
        <Header>{t('new-patient.header')}</Header>
        <StyledForm onSubmit={handleSubmit(submitForm)}>
          <InputsWrapper>
            <SectionWrapper>
              <InputWrapper>
                <Label>{t('new-patient.labels.first-name')}</Label>
                <InputAntD
                  size="large"
                  name="firstName"
                  placeholder={`${t('new-patient.placeholders.first-name')}`}
                  control={control}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.last-name')}</Label>
                <InputAntD
                  size="large"
                  name="lastName"
                  placeholder={`${t('new-patient.placeholders.last-name')}`}
                  control={control}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.email')}</Label>
                <InputAntD
                  size="large"
                  name="email"
                  placeholder={`${t('new-patient.placeholders.email')}`}
                  control={control}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.gender')}</Label>
                <SelectAntD
                  size="large"
                  name="gender"
                  control={control}
                  placeholder={`${t('new-patient.placeholders.gender')}`}
                  options={genderOption}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.date-of-birth')}</Label>
                <DatepickerAntD
                  size="large"
                  name="dateOfBirth"
                  control={control}
                  placeholder={`${t('new-patient.placeholders.date-of-birth')}`}
                />
              </InputWrapper>
            </SectionWrapper>

            <SectionWrapper>
              <InputWrapper>
                <Label>{t('new-patient.labels.country')}</Label>
                <SelectAntD
                  size="large"
                  name="country"
                  control={control}
                  options={countryOptionsWithCode}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.city')}</Label>
                <InputAntD
                  size="large"
                  name="city"
                  placeholder={`${t('new-patient.placeholders.city')}`}
                  control={control}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.phone-number')}</Label>
                <InputPhoneNumber
                  name="phoneNumber"
                  placeholder={`${t('new-patient.placeholders.phone-number')}`}
                  defaultCountry={(getValues('country') || 'AO') as CountryCode}
                  control={control}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.overview')}</Label>
                <TextareaAntD
                  size="large"
                  name="overview"
                  control={control}
                  placeholder={`${t('new-patient.placeholders.overview')}`}
                />
              </InputWrapper>
            </SectionWrapper>
          </InputsWrapper>

          <ButtonsWrapper>
            <StyledButton
              size="large"
              type="default"
              onClick={() => navigate(routes.patients)}
            >
              {t('new-patient.cancel-btn')}
            </StyledButton>
            <StyledButton
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
            >
              {t('new-patient.submit-btn')}
            </StyledButton>
          </ButtonsWrapper>
        </StyledForm>
      </Container>
    </>
  );
}

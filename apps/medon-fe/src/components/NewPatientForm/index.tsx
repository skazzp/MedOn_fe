import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CountryCode } from 'libphonenumber-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';

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
} from 'components/common/';

import {
  Container,
  StyledForm,
  ButtonsWrapper,
  Header,
  ErrorMsg,
  Label,
  StyledButton,
  SectionWrapper,
  InputsWrapper,
  InputWrapper,
} from './styles';

export function NewPatientForm() {
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ICreatePatient>({
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

      await createPatient({ ...dto, dateOfBirth }).unwrap();
      reset();
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
                  name="firstName"
                  placeholder={`${t('new-patient.placeholders.first-name')}`}
                  control={control}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.last-name')}</Label>
                <InputAntD
                  name="lastName"
                  placeholder={`${t('new-patient.placeholders.last-name')}`}
                  control={control}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.email')}</Label>
                <InputAntD
                  name="email"
                  placeholder={`${t('new-patient.placeholders.email')}`}
                  control={control}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.gender')}</Label>
                <SelectAntD
                  name="gender"
                  control={control}
                  placeholder={`${t('new-patient.placeholders.gender')}`}
                  options={genderOption}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.date-of-birth')}</Label>
                <DatepickerAntD
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
                  name="country"
                  control={control}
                  options={countryOptionsWithCode}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.city')}</Label>
                <InputAntD
                  name="city"
                  placeholder={`${t('new-patient.placeholders.city')}`}
                  control={control}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.phone-number')}</Label>
                <PhoneInputWithCountry
                  name="phoneNumber"
                  defaultCountry={(getValues('country') || 'AO') as CountryCode}
                  control={control}
                />
                {errors.phoneNumber && (
                  <ErrorMsg>{errors.phoneNumber?.message?.toString()}</ErrorMsg>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.overview')}</Label>
                <TextareaAntD
                  name="overview"
                  control={control}
                  placeholder={`${t('new-patient.placeholders.overview')}`}
                />
              </InputWrapper>
            </SectionWrapper>
          </InputsWrapper>

          <ButtonsWrapper>
            <StyledButton
              type="default"
              onClick={() => navigate(routes.patientList)}
            >
              {t('new-patient.cancel-btn')}
            </StyledButton>
            <StyledButton type="primary" htmlType="submit" loading={isLoading}>
              {t('new-patient.submit-btn')}
            </StyledButton>
          </ButtonsWrapper>
        </StyledForm>
      </Container>
    </>
  );
}

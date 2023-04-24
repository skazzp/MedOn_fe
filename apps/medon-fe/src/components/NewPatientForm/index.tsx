import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { CountryCode } from 'libphonenumber-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import { Input } from 'antd';

import { Gender, DATE_FORMAT_REG, routes } from 'utils/constants/';
import { toastConfig } from 'utils/toastConfig';
import { countryOptionsWithCode } from 'utils/countries/countryOptions';
import { newPatientSchema } from 'validation/newPatientSchema';
import { IServerError } from 'interfaces/serverResponse';
import { ICreatePatient } from 'interfaces/patients';
import { useCreatePatientMutation } from 'redux/api/patientApi';

import { LinkGoBack } from 'components/LinkGoBack';
import {
  Container,
  StyledForm,
  ButtonsWrapper,
  Header,
  StyledSelect,
  StyledDatePicker,
  ErrorMsg,
  Label,
  StyledButton,
  SectionWrapper,
  InputsWrapper,
  InputWrapper,
} from './styles';
import 'react-phone-number-input/style.css';

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
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={`${t(
                        'new-patient.placeholders.first-name'
                      )}`}
                      status={errors.firstName ? 'error' : ''}
                    />
                  )}
                />
                {errors.firstName && (
                  <ErrorMsg>{errors.firstName?.message?.toString()}</ErrorMsg>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.last-name')}</Label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={`${t('new-patient.placeholders.last-name')}`}
                      status={errors.lastName ? 'error' : ''}
                    />
                  )}
                />
                {errors.lastName && (
                  <ErrorMsg>{errors.lastName?.message?.toString()}</ErrorMsg>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.email')}</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={`${t('new-patient.placeholders.email')}`}
                      status={errors.email ? 'error' : ''}
                    />
                  )}
                />
                {errors.email && (
                  <ErrorMsg>{errors.email?.message?.toString()}</ErrorMsg>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.gender')}</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <StyledSelect
                      placeholder={`${t('new-patient.placeholders.gender')}`}
                      {...field}
                      options={[
                        { label: 'Female', value: Gender.Female },
                        { label: 'Male', value: Gender.Male },
                      ]}
                    />
                  )}
                />
                {errors.gender && (
                  <ErrorMsg>{errors.gender?.message?.toString()}</ErrorMsg>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.date-of-birth')}</Label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <StyledDatePicker
                      placeholder={`${t(
                        'new-patient.placeholders.date-of-birth'
                      )}`}
                      format={DATE_FORMAT_REG}
                      allowClear={false}
                      status={errors.dateOfBirth ? 'error' : undefined}
                      ref={field.ref}
                      name={field.name}
                      onBlur={field.onBlur}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <ErrorMsg>{errors.dateOfBirth?.message?.toString()}</ErrorMsg>
                )}
              </InputWrapper>
            </SectionWrapper>

            <SectionWrapper>
              <InputWrapper>
                <Label>{t('new-patient.labels.country')}</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <StyledSelect
                      defaultValue="UA"
                      {...field}
                      options={countryOptionsWithCode}
                    />
                  )}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>{t('new-patient.labels.city')}</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={`${t('new-patient.placeholders.city')}`}
                      status={errors.city ? 'error' : ''}
                    />
                  )}
                />
                {errors.city && (
                  <ErrorMsg>{errors.city?.message?.toString()}</ErrorMsg>
                )}
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
                <Controller
                  name="overview"
                  control={control}
                  render={({ field }) => (
                    <Input.TextArea
                      {...field}
                      autoSize={{ minRows: 4 }}
                      placeholder={`${t('new-patient.placeholders.overview')}`}
                      status={errors.overview ? 'error' : ''}
                    />
                  )}
                />
                {errors.overview && (
                  <ErrorMsg>{errors.overview?.message?.toString()}</ErrorMsg>
                )}
              </InputWrapper>
            </SectionWrapper>
          </InputsWrapper>

          <ButtonsWrapper>
            <StyledButton
              type="default"
              onClick={() => navigate(routes.patients)}
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

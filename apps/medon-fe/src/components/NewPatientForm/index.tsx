import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import { Input } from 'antd';
import { LinkGoBack } from 'components/LinkGoBack';
import { Sex } from 'utils/constants/sex';
import { DATE_FORMAT_REG } from 'utils/constants/dateFormat';
import { countryOptionsWithCode } from 'utils/countries/countryOptions';
import { newPatientSchema } from 'validation/newPatientSchema';
import {
  Container,
  StyledForm,
  InputWrapper,
  Header,
  StyledSelect,
  StyledDatePicker,
  ErrorMsg,
  Label,
  StyledButton,
} from './styles';
import 'react-phone-number-input/style.css';

export function NewPatientForm() {
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(newPatientSchema),
  });

  const { t } = useTranslation();

  function onSubmit() {
    // TODO: Integration with BackEnd
  }

  watch('country');

  return (
    <>
      <LinkGoBack>Back to Patients list</LinkGoBack>
      <Container>
        <Header>Create new patient card</Header>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <Label>First Name</Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter first name"
                  status={errors.birthday ? 'error' : ''}
                />
              )}
            />
            {errors.firstName && (
              <ErrorMsg>{errors.firstName?.message?.toString()}</ErrorMsg>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>Last Name</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter last name"
                  status={errors.lastName ? 'error' : ''}
                />
              )}
            />
            {errors.lastName && (
              <ErrorMsg>{errors.lastName?.message?.toString()}</ErrorMsg>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter email"
                  status={errors.email ? 'error' : ''}
                />
              )}
            />
            {errors.email && (
              <ErrorMsg>{errors.email?.message?.toString()}</ErrorMsg>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>Sex</Label>
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  placeholder="Enter sex"
                  defaultValue={Sex.Female}
                  {...field}
                  options={[
                    { label: 'Female', value: Sex.Female },
                    { label: 'Male', value: Sex.Male },
                  ]}
                />
              )}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>Date of Birth</Label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <StyledDatePicker
                  placeholder="Enter date of birth"
                  format={DATE_FORMAT_REG}
                  allowClear={false}
                  status={errors.dateOfBirth ? 'error' : undefined}
                  {...field}
                />
              )}
            />
            {errors.dateOfBirth && (
              <ErrorMsg>{errors.dateOfBirth?.message?.toString()}</ErrorMsg>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>Country</Label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  placeholder="Enter country"
                  defaultValue="UA"
                  {...field}
                  options={countryOptionsWithCode}
                />
              )}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter address"
                  status={errors.address ? 'error' : ''}
                />
              )}
            />
            {errors.address && (
              <ErrorMsg>{errors.address?.message?.toString()}</ErrorMsg>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>Phone Number</Label>
            <PhoneInputWithCountry
              name="phoneNumber"
              defaultCountry={getValues('country') || 'UA'}
              control={control}
            />
            {errors.phoneNumber && (
              <ErrorMsg>{errors.phoneNumber?.message?.toString()}</ErrorMsg>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>Overview</Label>
            <Controller
              name="overview"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  placeholder="Overview"
                  status={errors.overview ? 'error' : ''}
                />
              )}
            />
            {errors.overview && (
              <ErrorMsg>{errors.overview?.message?.toString()}</ErrorMsg>
            )}
          </InputWrapper>

          <StyledButton type="primary" htmlType="submit">
            Save Patient
          </StyledButton>
        </StyledForm>
      </Container>
    </>
  );
}

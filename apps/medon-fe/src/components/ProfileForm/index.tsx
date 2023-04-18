import { useState } from 'react';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { DATE_FORMAT_REG } from 'utils/constants/dateFormat';
import { ROLES, ROLE_OPTIONS, SPECIALITY_OPTIONS } from 'utils/constants/roles';
import {
  DEFAULT_TIMEZONE,
  timezoneOptions,
} from 'utils/timezones/timezoneOptions';
import {
  COUNTRY,
  ROLE,
  SPECIALITY,
  TIMEZONE,
} from 'utils/constants/userFormFields';
import { countryOptions } from 'utils/countries/countryOptions';
import ProfileSelect from 'components/ProfileSelect';
import profile_pic from 'assets/images/profile_pic.png';
import { profileFormSchema } from 'validation/profileFormSchema';
import {
  Container,
  Label,
  StyledButton,
  Form,
  InputContainer,
  ButtonContainer,
  LabelText,
  ErrorMsg,
  StyledDatePicker,
  ImageContainer,
  AntInputDisabledStyle,
  AntInputStyle,
} from './styles';
import { FormProfileData } from './types';

export default function ProfileForm() {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(true);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProfileData>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: null,

      birthday: null,
      country: null,
      city: '',
      timezone: DEFAULT_TIMEZONE,
    },
  });
  const role = watch(ROLE);

  // default value, will be changed to isLoading from Query in integration
  const isLoading = false;

  const onSubmit = handleSubmit(() => {});
  return (
    <Container>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <ImageContainer>
            <img src={profile_pic} alt={`${t('profileForm.profilePicAlt')}`} />
          </ImageContainer>
          <Form onSubmit={onSubmit}>
            <InputContainer>
              <Label htmlFor="firstName">
                <LabelText>{t('profileForm.firstName.label')}</LabelText>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="firstName"
                      size="large"
                      style={disabled ? AntInputDisabledStyle : AntInputStyle}
                      disabled={disabled}
                      status={errors.firstName?.message ? 'error' : undefined}
                      placeholder={`${t('profileForm.firstName.placeholder')}`}
                      {...field}
                    />
                  )}
                />
                {errors.firstName?.message && (
                  <ErrorMsg role="alert">
                    {t(`${errors.firstName?.message}`)}
                  </ErrorMsg>
                )}
              </Label>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="lastName">
                <LabelText>{t('profileForm.lastName.label')}</LabelText>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="lastName"
                      size="large"
                      style={disabled ? AntInputDisabledStyle : AntInputStyle}
                      disabled={disabled}
                      status={errors.lastName?.message ? 'error' : undefined}
                      placeholder={`${t('profileForm.lastName.placeholder')}`}
                      {...field}
                    />
                  )}
                />
                {errors.lastName?.message && (
                  <ErrorMsg role="alert">
                    {t(`${errors.lastName?.message}`)}
                  </ErrorMsg>
                )}
              </Label>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="email">
                <LabelText>{t('profileForm.email.label')}</LabelText>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      size="large"
                      style={disabled ? AntInputDisabledStyle : AntInputStyle}
                      disabled={disabled}
                      status={errors.email?.message ? 'error' : undefined}
                      placeholder={`${t('profileForm.email.placeholder')}`}
                      {...field}
                    />
                  )}
                />
                {errors.email?.message && (
                  <ErrorMsg role="alert">
                    {t(`${errors.email?.message}`)}
                  </ErrorMsg>
                )}
              </Label>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="birthday">
                <LabelText>{t('profileForm.birthday.label')}</LabelText>
                <Controller
                  name="birthday"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <StyledDatePicker
                      id="birthday"
                      placeholder={`${t('profileForm.birthday.placeholder')}`}
                      format={DATE_FORMAT_REG}
                      allowClear={false}
                      size="large"
                      style={disabled ? AntInputDisabledStyle : AntInputStyle}
                      disabled={disabled}
                      status={errors.birthday?.message ? 'error' : undefined}
                      ref={field.ref}
                      name={field.name}
                      onBlur={field.onBlur}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? new Date(date.valueOf()).toUTCString() : null
                        );
                      }}
                    />
                  )}
                />
                {errors.birthday?.message && (
                  <ErrorMsg role="alert">
                    {t(`${errors.birthday?.message}`)}
                  </ErrorMsg>
                )}
              </Label>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="country">
                <ProfileSelect
                  name={COUNTRY}
                  control={control}
                  disabled={disabled}
                  error={errors.country?.message}
                  options={countryOptions}
                />
              </Label>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="city">
                <LabelText>{t('profileForm.city.label')}</LabelText>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="city"
                      size="large"
                      style={disabled ? AntInputDisabledStyle : AntInputStyle}
                      disabled={disabled}
                      status={errors.city?.message ? 'error' : undefined}
                      placeholder={`${t('profileForm.city.placeholder')}`}
                      {...field}
                    />
                  )}
                />
                {errors.city?.message && (
                  <ErrorMsg role="alert">
                    {t(`${errors.city?.message}`)}
                  </ErrorMsg>
                )}
              </Label>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="timezone">
                <ProfileSelect
                  name={TIMEZONE}
                  control={control}
                  disabled={disabled}
                  error={errors.timezone?.message}
                  options={timezoneOptions}
                />
              </Label>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="role">
                <ProfileSelect
                  name={ROLE}
                  control={control}
                  disabled={disabled}
                  error={errors.role?.message}
                  options={ROLE_OPTIONS}
                />
              </Label>
            </InputContainer>
            {role === ROLES.REMOTE && (
              <InputContainer>
                <Label htmlFor="role">
                  <ProfileSelect
                    name={SPECIALITY}
                    control={control}
                    error={errors.speciality?.message}
                    options={SPECIALITY_OPTIONS}
                    disabled={disabled}
                  />
                </Label>
              </InputContainer>
            )}
          </Form>
          <ButtonContainer>
            {disabled ? (
              <StyledButton
                size="large"
                htmlType="button"
                onClick={() => {
                  setDisabled(false);
                }}
              >
                Edit Profile
              </StyledButton>
            ) : (
              <StyledButton size="large" htmlType="submit">
                {t('profileForm.profileBtn')}
              </StyledButton>
            )}
            <StyledButton size="large" htmlType="submit" disabled={true}>
              {t('profileForm.changePasswordBtn')}
            </StyledButton>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}

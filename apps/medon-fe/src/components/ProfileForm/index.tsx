import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DATE_FORMAT_REG } from 'utils/constants/dateFormat';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROLE_OPTIONS } from 'utils/constants/roles';
import { Input, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  // DEFAULT_TIMEZONE,
  timezoneOptions,
} from 'utils/timezones/timezoneOptions';
import { countryOptions } from 'utils/countries/countryOptions';
import { COUNTRY, TIMEZONE, ROLE } from 'utils/constants/profileFormFields';
import { profileFormSchema } from 'validation/profileFormSchema';
import ProfileSelect from 'components/ProfileSelect';
import { UserOutlined } from '@ant-design/icons';
import { useGetUserQuery } from 'redux/api/userApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setUser } from 'redux/features/userSlice/userSlice';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import {
  Container,
  Label,
  ProfileImage,
  StyledButton,
  Form,
  InputContainer,
  ButtonContainer,
  LabelText,
  ErrorMsg,
  StyledDatePicker,
  ImageContainer,
} from './styles';

import { FormProfileData } from './types';
import { AvatarUploader } from './AvatarUploader';

export default function ProfileForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserSelector);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormProfileData>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      birthday: user.dateOfBirth,
      country: user.country,
      city: user.city,
      timezone: user.time_zone,
    },
  });

  const { isLoading, data } = useGetUserQuery(null);

  useEffect(() => {
    if (data) {
      // console.log('Profile DATA', data?.data);
      dispatch(setUser(data.data));
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('email', user.email);
      setValue('role', user.role);
      setValue('birthday', dayjs(user.dateOfBirth));
      setValue('country', user.country);
      setValue('city', user.city);
      setValue('timezone', user.time_zone);
    }
    // console.log('USER STATE', user);
  }, [data, dispatch, setValue, user]);

  const onSubmit = handleSubmit(() => {});
  return (
    <span>
      {isLoading ? (
        <Spin />
      ) : (
        <Container>
          <ImageContainer>
            <ProfileImage
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              icon={<UserOutlined />}
            />
            <AvatarUploader />
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
                  error={errors.role?.message}
                  options={ROLE_OPTIONS}
                />
              </Label>
            </InputContainer>
          </Form>
          <ButtonContainer>
            <StyledButton size="large" htmlType="submit">
              {t('profileForm.profileBtn')}
            </StyledButton>
            <StyledButton size="large" htmlType="submit">
              {t('profileForm.changePasswordBtn')}
            </StyledButton>
          </ButtonContainer>
        </Container>
      )}
    </span>
  );
}

import { Controller, useForm } from 'react-hook-form';
import { DATE_FORMAT_REG } from 'utils/constants/dateFormat';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { profileFormSchema } from 'validation/profileFormSchema';
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
} from './styles';
import { FormProfileData } from './types';

export default function ProfileForm() {
  const { t } = useTranslation();
  const {
    control,
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
    },
  });

  return (
    <Container>
      <ProfileImage src="https://via.placeholder.com/250" alt="Profile Image" />
      <Form>
        <InputContainer>
          <Label htmlFor="firstName">
            <LabelText>{t('regForm.firstName.label')}</LabelText>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  id="firstName"
                  size="large"
                  status={errors.firstName?.message ? 'error' : undefined}
                  placeholder={`${t('regForm.firstName.placeholder')}`}
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
            <LabelText>{t('regForm.lastName.label')}</LabelText>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  id="lastName"
                  size="large"
                  status={errors.lastName?.message ? 'error' : undefined}
                  placeholder={`${t('regForm.lastName.placeholder')}`}
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
            <LabelText>{t('regForm.email.label')}</LabelText>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  size="large"
                  status={errors.email?.message ? 'error' : undefined}
                  placeholder={`${t('regForm.email.placeholder')}`}
                  {...field}
                />
              )}
            />
            {errors.email?.message && (
              <ErrorMsg role="alert">{t(`${errors.email?.message}`)}</ErrorMsg>
            )}
          </Label>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="birthday">
            <LabelText>{t('regForm.birthday.label')}</LabelText>
            <Controller
              name="birthday"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <StyledDatePicker
                  id="birthday"
                  placeholder={`${t('regForm.birthday.placeholder')}`}
                  format={DATE_FORMAT_REG}
                  allowClear={false}
                  style={{ width: '100%' }}
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
          <Label htmlFor="country">Country</Label>
          <Input
            size="large"
            type="text"
            id="country"
            placeholder="Type your country"
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="city">
            <LabelText>{t('regForm.city.label')}</LabelText>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  id="city"
                  size="large"
                  status={errors.city?.message ? 'error' : undefined}
                  placeholder={`${t('regForm.city.placeholder')}`}
                  {...field}
                />
              )}
            />
            {errors.city?.message && (
              <ErrorMsg role="alert">{t(`${errors.city?.message}`)}</ErrorMsg>
            )}
          </Label>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="role">Role</Label>
          <Select
            defaultValue={'Select your role'}
            size="large"
            options={[
              { value: 'Local Doctor', label: 'Local Doctor' },
              { value: 'Remote Doctor', label: 'Remote Doctor' },
            ]}
          />
        </InputContainer>
      </Form>
      <ButtonContainer>
        <StyledButton size="large" htmlType="submit" disabled={false}>
          Update Profile
        </StyledButton>
        <StyledButton size="large" htmlType="submit" disabled={false}>
          Change Password
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
}

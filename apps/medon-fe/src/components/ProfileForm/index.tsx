import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, DatePicker, Select } from 'antd';
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
          <Label htmlFor="lastName"></Label>
          <LabelText>{t('regForm.lastName.label')}</LabelText>
          <Input size="large" type="text" id="lastName" />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Type your email"
            size="large"
            type="email"
            id="email"
            name="email"
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <DatePicker size="large" id="dateOfBirth" />
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
          <Label htmlFor="city">City</Label>
          <Input
            size="large"
            type="text"
            id="city"
            placeholder="Type your city"
          />
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

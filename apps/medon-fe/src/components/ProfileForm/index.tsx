import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputAntD } from 'components/InputAntD';
import { SelectAntD } from 'components/SelectAntD';
import { DatepickerAntD } from 'components/DatepickerAntD';

import profile_pic from 'assets/images/profile_pic.png';
import { ROLES, ROLE_OPTIONS, SPECIALITY_OPTIONS } from 'utils/constants/roles';
import {
  DEFAULT_TIMEZONE,
  timezoneOptions,
} from 'utils/timezones/timezoneOptions';
import { formFields } from 'utils/constants/userFormFields';
import { countryOptions } from 'utils/countries/countryOptions';
import { profileFormSchema } from 'validation/profileFormSchema';
import { FormProfileData } from './types';
import {
  Container,
  Label,
  StyledButton,
  Form,
  InputContainer,
  ButtonContainer,
  ImageContainer,
  LabelText,
} from './styles';

export default function ProfileForm() {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(true);
  const { control, handleSubmit, watch } = useForm<FormProfileData>({
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
  const role = watch(formFields.role);

  const onSubmit = handleSubmit(() => {});
  return (
    <Container>
      <>
        <ImageContainer>
          <img src={profile_pic} alt={`${t('profileForm.profilePicAlt')}`} />
        </ImageContainer>
        <Form onSubmit={onSubmit}>
          <InputContainer>
            <Label htmlFor="firstName">
              <LabelText>{t('profileForm.firstName.label')}</LabelText>
              <InputAntD
                name={formFields.firstName}
                control={control}
                disabled={disabled}
                placeholder={`${t('profileForm.firstName.placeholder')}`}
                size="large"
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="lastName">
              <LabelText>{t('profileForm.lastName.label')}</LabelText>
              <InputAntD
                name={formFields.lastName}
                control={control}
                disabled={disabled}
                placeholder={`${t('profileForm.lastName.placeholder')}`}
                size="large"
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="email">
              <LabelText>{t('profileForm.email.label')}</LabelText>
              <InputAntD
                name={formFields.email}
                control={control}
                disabled={disabled}
                placeholder={`${t('profileForm.email.placeholder')}`}
                size="large"
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="birthday">
              <LabelText>{t('profileForm.birthday.label')}</LabelText>
              <DatepickerAntD
                name={formFields.birthday}
                control={control}
                disabled={disabled}
                placeholder={`${t('profileForm.birthday.placeholder')}`}
                size="large"
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="country">
              <LabelText>{t('profileForm.country.label')}</LabelText>
              <SelectAntD
                name={formFields.country}
                control={control}
                disabled={disabled}
                size="large"
                placeholder={`${t('profileForm.country.placeholder')}`}
                options={countryOptions}
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="city">
              <LabelText>{t('profileForm.city.label')}</LabelText>
              <InputAntD
                name={formFields.city}
                control={control}
                disabled={disabled}
                size="large"
                placeholder={`${t('profileForm.city.placeholder')}`}
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="timezone">
              <LabelText>{t('profileForm.timezone.label')}</LabelText>
              <SelectAntD
                name={formFields.timezone}
                control={control}
                disabled={disabled}
                size="large"
                placeholder={`${t('profileForm.timezone.placeholder')}`}
                options={timezoneOptions}
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="role">
              <LabelText>{t('profileForm.role.label')}</LabelText>
              <SelectAntD
                name={formFields.role}
                control={control}
                disabled={disabled}
                size="large"
                placeholder={`${t('profileForm.role.placeholder')}`}
                options={ROLE_OPTIONS}
              />
            </Label>
          </InputContainer>
          {role === ROLES.REMOTE && (
            <InputContainer>
              <Label htmlFor="speciality">
                <LabelText>{t('profileForm.speciality.label')}</LabelText>
                <SelectAntD
                  name={formFields.speciality}
                  control={control}
                  disabled={disabled}
                  size="large"
                  placeholder={`${t('profileForm.speciality.placeholder')}`}
                  options={SPECIALITY_OPTIONS}
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
              {t('profileForm.editProfileBtn')}
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
    </Container>
  );
}

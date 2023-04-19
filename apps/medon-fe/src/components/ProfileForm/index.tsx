import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { ROLES, ROLE_OPTIONS, SPECIALITY_OPTIONS } from 'utils/constants/roles';
import {
  DEFAULT_TIMEZONE,
  timezoneOptions,
} from 'utils/timezones/timezoneOptions';
import { formFields } from 'utils/constants/userFormFields';
import { countryOptions } from 'utils/countries/countryOptions';
import ProfileSelect from 'components/ProfileForm/ProfileSelect';
import ProfileInput from 'components/ProfileForm/ProfileInput';
import ProfileDatepicker from 'components/ProfileForm/ProfileDatepicker';
import profile_pic from 'assets/images/profile_pic.png';
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
} from './styles';
import { InputFields } from './ProfileInput/types';

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
              <ProfileInput
                name={InputFields.firstName}
                control={control}
                disabled={disabled}
                error={errors.firstName?.message}
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="lastName">
              <ProfileInput
                name={InputFields.lastName}
                control={control}
                disabled={disabled}
                error={errors.lastName?.message}
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="email">
              <ProfileInput
                name={InputFields.email}
                control={control}
                disabled={disabled}
                error={errors.email?.message}
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="birthday">
              <ProfileDatepicker
                control={control}
                disabled={disabled}
                error={errors.birthday?.message}
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="country">
              <ProfileSelect
                name={formFields.country}
                control={control}
                disabled={disabled}
                error={errors.country?.message}
                options={countryOptions}
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="city">
              <ProfileInput
                name={InputFields.city}
                control={control}
                disabled={disabled}
                error={errors.city?.message}
              />
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="timezone">
              <ProfileSelect
                name={formFields.timezone}
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
                name={formFields.role}
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
                  name={formFields.speciality}
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

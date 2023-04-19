import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { timezoneOptions } from 'utils/timezones/timezoneOptions';
import { ROLE, SPECIALITY, formFields } from 'utils/constants/userFormFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { ROLES, ROLE_OPTIONS } from 'utils/constants/roles';
import { countryOptions } from 'utils/countries/countryOptions';
import ProfileSelect from 'components/ProfileForm/ProfileSelect';
import ProfileInput from 'components/ProfileForm/ProfileInput';
import ProfileDatepicker from 'components/ProfileForm/ProfileDatepicker';
import profile_pic from 'assets/images/profile_pic.png';
import { profileFormSchema } from 'validation/profileFormSchema';
import { useGetUserQuery } from 'redux/api/userApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import useSpecOptions from 'components/RegistrationForm/useSpecOptions';
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

interface IProps {
  submitForm: (values: FormProfileData) => void;
}

export default function ProfileForm({ submitForm }: IProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(true);
  const user = useAppSelector(getUserSelector);
  const {
    control,
    handleSubmit,
    watch,
    // getValues,
    setValue,
    formState: { errors },
  } = useForm<FormProfileData>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      speciality: user.specialityId,
      birthday: user.dateOfBirth,
      country: user.country,
      city: user.city ?? '',
      timezone: user.timeZone,
    },
  });
  const { specialityOptions } = useSpecOptions();
  const role = watch(ROLE);


  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('email', user.email);
      setValue('role', user.role);
      setValue('country', user.country);
      setValue('city', user.city);
      setValue('timezone', user.timeZone);
      setValue('speciality', user.specialityId);
      if (user.dateOfBirth) {
        setValue('birthday', dayjs(user.dateOfBirth));
      }
      // const currentValues = getValues();
      // console.log(currentValues);
    }
  }, [dispatch, setValue, user]);

  const onSubmit = handleSubmit(submitForm);
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
              <Label htmlFor="speciality">
                <ProfileSelect
                  name={SPECIALITY}
                  control={control}
                  error={errors.speciality?.message}
                  options={specialityOptions}
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

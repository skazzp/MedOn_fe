import { Dispatch, SetStateAction, useEffect } from 'react';
import dayjs from 'dayjs';
import { timezoneOptions } from 'utils/timezones/timezoneOptions';
import { ROLE, SPECIALITY, formFields } from 'utils/constants/userFormFields';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputAntD } from 'components/common/InputAntD';
import { SelectAntD } from 'components/common/SelectAntD';
import { DatepickerAntD } from 'components/common/DatepickerAntD';

import profile_pic from 'assets/images/profile_pic.png';
import { ROLES, ROLE_OPTIONS, SPECIALITY_OPTIONS } from 'utils/constants/roles';
import {
  DEFAULT_TIMEZONE,
  timezoneOptions,
} from 'utils/timezones/timezoneOptions';
import { formFields } from 'utils/constants/userFormFields';
import { countryOptions } from 'utils/countries/countryOptions';
import { profileFormSchema } from 'validation/profileFormSchema';
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
  LabelText,
} from './styles';

interface IProps {
  submitForm: (values: FormProfileData) => void;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileForm({
  submitForm,
  disabled,
  setDisabled,
}: IProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  // const [disabled, setDisabled] = useState(true);
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
          <ButtonContainer>
            {disabled && (
              <StyledButton
                size="large"
                htmlType="button"
                onClick={() => {
                  setDisabled(false);
                }}
              >
                {t('profileForm.editProfileBtn')}
              </StyledButton>
            )}
            {!disabled && (
              <StyledButton size="large" htmlType="submit">
                {t('profileForm.profileBtn')}
              </StyledButton>
            )}
            <StyledButton size="large" htmlType="button" disabled={true}>
              {t('profileForm.changePasswordBtn')}
            </StyledButton>
          </ButtonContainer>
        </Form>
      </>
    </Container>
  );
}

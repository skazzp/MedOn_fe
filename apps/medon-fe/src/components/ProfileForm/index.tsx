import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';

import { InputAntD } from 'components/common/InputAntD';
import { SelectAntD } from 'components/common/SelectAntD';
import { DatepickerAntD } from 'components/common/DatepickerAntD';
import useSpecOptions from 'components/RegistrationForm/hooks';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { profileFormSchema } from 'validation/profileFormSchema';
import profile_pic from 'assets/images/profile_pic.png';
import { roles, rolesOptions } from 'utils/constants/roles';
import { timezoneOptions } from 'utils/timezones/timezoneOptions';
import { formFields } from 'utils/constants/userFormFields';
import { countryOptions } from 'utils/countries/countryOptions';
import { routes } from 'utils/constants/routes';

import AvatarUpload from 'components/AvatarUpload';
import {
  Container,
  Label,
  StyledButton,
  Form,
  InputContainer,
  ButtonContainer,
  ImageContainer,
  LabelText,
  UserPhoto,
  AvatarChangeBox,
} from './styles';
import { FormProfileData } from './types';

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
  const navigate = useNavigate();
  const user = useAppSelector(getUserSelector);
  const { control, handleSubmit, watch, reset, setValue } =
    useForm<FormProfileData>({
      mode: 'onBlur',
      resolver: yupResolver(profileFormSchema),
      defaultValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        speciality: user.specialityId,
        birthday: user.dateOfBirth,
        country: user.country,
        city: user.city,
        timezone: user.timeZone,
      },
    });
  const { specialityOptions } = useSpecOptions();
  const role = watch(formFields.role);

  const handleUpdatePassword = () => {
    navigate(routes.updatePassword);
  };

  const onSubmit = handleSubmit(submitForm);

  useEffect(() => {
    if (user.email) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        country: user.country,
        city: user.city,
        timezone: user.timeZone,
        speciality: user.specialityId,
        birthday: user.dateOfBirth,
      });
    }
  }, [dispatch, reset, setValue, user]);

  return (
    <Container>
      <>
        <AvatarChangeBox>
          <ImageContainer>
            <UserPhoto
              src={
                user.photo
                  ? process.env.NX_PUBLIC_S3_BUCKET_URL + user.photo
                  : profile_pic
              }
              alt={`${t('profileForm.profilePicAlt')}`}
            />
          </ImageContainer>
          <AvatarUpload />
        </AvatarChangeBox>
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
                disabled={true}
                placeholder={`${t('profileForm.email.placeholder')}`}
                size="large"
              />
            </Label>
          </InputContainer>
          {!user.role && (
            <InputContainer>
              <Label htmlFor="role">
                <LabelText>{t('profileForm.role.label')}</LabelText>
                <SelectAntD
                  name={formFields.role}
                  control={control}
                  disabled={disabled}
                  size="large"
                  placeholder={`${t('profileForm.role.placeholder')}`}
                  options={rolesOptions}
                />
              </Label>
            </InputContainer>
          )}
          {role === roles.remote && (
            <InputContainer>
              <Label htmlFor="speciality">
                <LabelText>{t('profileForm.speciality.label')}</LabelText>
                <SelectAntD
                  name={formFields.speciality}
                  control={control}
                  disabled={disabled}
                  size="large"
                  placeholder={`${t('profileForm.speciality.placeholder')}`}
                  options={specialityOptions}
                />
              </Label>
            </InputContainer>
          )}
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
                <CheckOutlined />
                {t('profileForm.profileBtn')}
              </StyledButton>
            )}
            <StyledButton
              size="large"
              htmlType="button"
              onClick={handleUpdatePassword}
            >
              {t('profileForm.changePasswordBtn')}
            </StyledButton>
          </ButtonContainer>
        </Form>
      </>
    </Container>
  );
}

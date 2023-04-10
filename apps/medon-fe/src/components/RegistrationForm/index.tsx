import { Controller, useForm } from 'react-hook-form';
import { Input } from 'antd';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { registrationFormSchema } from 'validation/registrationFormSchema';
import { countryOptions } from 'utils/countries/countryOptions';
import RegistrationSelect from 'components/RegistrationSelect';
import { timezoneOptions } from 'utils/timezones/timezoneOptions';
import { ROLES, ROLE_OPTIONS, SPECIALITY_OPTIONS } from 'utils/constants/roles';
import { DATE_FORMAT_REG } from 'utils/constants/dateFormat';
import {
  COUNTRY,
  ROLE,
  SPECIALITY,
  TIMEZONE,
} from 'utils/constants/regFormFields';
import {
  BackBtn,
  Btn,
  BtnContainer,
  Container,
  ErrorMsg,
  Form,
  InputContainer,
  Label,
  LabelShort,
  LabelText,
  PassErrorMsg,
  PasswordContainer,
  StyledDatePicker,
} from './styles';
import { FormData } from './types';

export default function RegistrationForm() {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registrationFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: null,
      speciality: null,
      birthday: null,
      country: null,
      city: '',
      timezone: '(UTC) Coordinated Universal Time',
    },
  });
  const role = watch(ROLE);
  const onSubmit = handleSubmit(() => {});
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <LabelShort htmlFor="firstName">
            <LabelText>{t('regForm.firstName.label')}</LabelText>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  id="firstName"
                  status={errors.firstName?.message ? 'error' : undefined}
                  placeholder={`${t('regForm.firstName.placeholder')}`}
                  {...field}
                />
              )}
            />
            <ErrorMsg role="alert">{errors.firstName?.message}</ErrorMsg>
          </LabelShort>
          <LabelShort htmlFor="lastName">
            <LabelText>{t('regForm.lastName.label')}</LabelText>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  id="lastName"
                  status={errors.lastName?.message ? 'error' : undefined}
                  placeholder={`${t('regForm.lastName.placeholder')}`}
                  {...field}
                />
              )}
            />
            <ErrorMsg role="alert">{errors.lastName?.message}</ErrorMsg>
          </LabelShort>
        </InputContainer>
        <Label htmlFor="email">
          <LabelText>{t('regForm.email.label')}</LabelText>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                id="email"
                status={errors.email?.message ? 'error' : undefined}
                placeholder={`${t('regForm.email.placeholder')}`}
                {...field}
              />
            )}
          />
          <ErrorMsg role="alert">{errors.email?.message}</ErrorMsg>
        </Label>
        <PasswordContainer>
          <InputContainer>
            <LabelShort htmlFor="password">
              <LabelText>{t('regForm.password.label')}</LabelText>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    id="password"
                    role="textbox"
                    status={errors.password?.message ? 'error' : undefined}
                    placeholder={`${t('regForm.password.placeholder')}`}
                    {...field}
                  />
                )}
              />
            </LabelShort>
            <LabelShort htmlFor="password">
              <LabelText>{t('regForm.passwordRepeat.label')}</LabelText>
              <Controller
                name="passwordRepeat"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    id="passwordRepeat"
                    status={
                      errors.passwordRepeat?.message ? 'error' : undefined
                    }
                    placeholder={`${t('regForm.passwordRepeat.placeholder')}`}
                    {...field}
                  />
                )}
              />
            </LabelShort>
          </InputContainer>
          <PassErrorMsg>
            {errors.password?.message
              ? errors.password?.message
              : errors.passwordRepeat?.message}
          </PassErrorMsg>
        </PasswordContainer>
        <Label htmlFor="role">
          <RegistrationSelect
            name={ROLE}
            control={control}
            error={errors.role?.message}
            options={ROLE_OPTIONS}
          />
        </Label>
        {role === ROLES.REMOTE && (
          <Label htmlFor="speciality">
            <RegistrationSelect
              name={SPECIALITY}
              control={control}
              error={errors.speciality?.message}
              options={SPECIALITY_OPTIONS}
            />
          </Label>
        )}
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
          <ErrorMsg role="alert">{errors.birthday?.message}</ErrorMsg>
        </Label>
        <InputContainer>
          <LabelShort htmlFor="country">
            <RegistrationSelect
              name={COUNTRY}
              control={control}
              error={errors.country?.message}
              options={countryOptions}
            />
          </LabelShort>
          <LabelShort htmlFor="city">
            <LabelText>{t('regForm.city.label')}</LabelText>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  id="city"
                  status={errors.city?.message ? 'error' : undefined}
                  placeholder={`${t('regForm.city.placeholder')}`}
                  {...field}
                />
              )}
            />
            <ErrorMsg role="alert">{errors.city?.message}</ErrorMsg>
          </LabelShort>
        </InputContainer>
        <Label htmlFor="timezone">
          <RegistrationSelect
            name={TIMEZONE}
            control={control}
            error={errors.timezone?.message}
            options={timezoneOptions}
          />
        </Label>
        <BtnContainer>
          <Btn type="primary" htmlType="submit">
            {t('regForm.submitBtn')}
          </Btn>
          <NavLink to="/">
            <BackBtn type="primary" htmlType="button">
              {t('regForm.backBtn')}
            </BackBtn>
          </NavLink>
        </BtnContainer>
      </Form>
    </Container>
  );
}

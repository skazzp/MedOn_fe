import { Controller, useForm } from 'react-hook-form';
import { Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { DatepickerAntD, SelectAntD, InputAntD } from 'components/common';

import { registrationFormSchema } from 'validation/registrationFormSchema';
import { countryOptions } from 'utils/countries/countryOptions';
import {
  DEFAULT_TIMEZONE,
  timezoneOptions,
} from 'utils/timezones/timezoneOptions';
import { ROLES, ROLE_OPTIONS } from 'utils/constants/roles';
import { formFields } from 'utils/constants/userFormFields';
import { FormData } from './types';
import useSpecOptions from './hooks';
import {
  BackBtn,
  Btn,
  BtnContainer,
  Container,
  Form,
  InputContainer,
  Label,
  LabelShort,
  LabelText,
  PassErrorMsg,
  PasswordContainer,
} from './styles';

interface IProps {
  submitForm: (values: FormData) => void;
}

export default function RegistrationForm({ submitForm }: IProps) {
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
      speciality: null,
      city: '',
      timezone: DEFAULT_TIMEZONE,
    },
  });
  const { specialityOptions } = useSpecOptions();
  const role = watch(formFields.role);
  const onSubmit = handleSubmit(submitForm);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <LabelShort htmlFor="firstName">
            <LabelText>{t('regForm.firstName.label')}</LabelText>
            <InputAntD
              name={formFields.firstName}
              control={control}
              placeholder={`${t('regForm.firstName.placeholder')}`}
            />
          </LabelShort>
          <LabelShort htmlFor="lastName">
            <LabelText>{t('regForm.lastName.label')}</LabelText>
            <InputAntD
              name={formFields.lastName}
              control={control}
              placeholder={`${t('regForm.lastName.placeholder')}`}
            />
          </LabelShort>
        </InputContainer>
        <Label htmlFor="email">
          <LabelText>{t('regForm.email.label')}</LabelText>
          <InputAntD
            name={formFields.email}
            control={control}
            placeholder={`${t('regForm.email.placeholder')}`}
          />
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
          {errors.password?.message ? (
            <PassErrorMsg>{t(`${errors.password?.message}`)}</PassErrorMsg>
          ) : (
            <PassErrorMsg>
              {errors.passwordRepeat?.message &&
                t(`${errors.passwordRepeat?.message}`)}
            </PassErrorMsg>
          )}
        </PasswordContainer>
        <Label htmlFor="role">
          <LabelText>{t('regForm.role.label')}</LabelText>
          <SelectAntD
            name={formFields.role}
            control={control}
            placeholder={`${t('regForm.role.placeholder')}`}
            options={ROLE_OPTIONS}
          />
        </Label>
        {role === ROLES.REMOTE && (
          <Label htmlFor="speciality">
            <LabelText>{t('regForm.speciality.label')}</LabelText>
            <SelectAntD
              name={formFields.speciality}
              control={control}
              placeholder={`${t('regForm.speciality.placeholder')}`}
              options={specialityOptions}
            />
          </Label>
        )}
        <Label htmlFor="birthday">
          <LabelText>{t('regForm.birthday.label')}</LabelText>
          <DatepickerAntD
            name={formFields.birthday}
            control={control}
            placeholder={`${t('regForm.birthday.placeholder')}`}
          />
        </Label>
        <InputContainer>
          <LabelShort htmlFor="country">
            <LabelText>{t('regForm.country.label')}</LabelText>
            <SelectAntD
              name={formFields.country}
              control={control}
              placeholder={`${t('regForm.country.placeholder')}`}
              options={countryOptions}
            />
          </LabelShort>
          <LabelShort htmlFor="city">
            <LabelText>{t('regForm.city.label')}</LabelText>
            <InputAntD
              name={formFields.city}
              control={control}
              placeholder={`${t('regForm.city.placeholder')}`}
            />
          </LabelShort>
        </InputContainer>
        <Label htmlFor="timezone">
          <SelectAntD
            name={formFields.timezone}
            control={control}
            placeholder={`${t('regForm.timezone.placeholder')}`}
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

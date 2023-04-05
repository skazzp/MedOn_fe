import { Controller, useForm } from 'react-hook-form';
import { Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { registrationFormSchema } from 'validation/registrationFormSchema';
import countries from 'utils/countries.json';
import timezones from 'utils/timezones.json';
import { ROLES } from 'utils/constants/roles';
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
  StyledSelect,
} from './styles';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  role: string;
  speciality: string | null;
  birthday: Dayjs | null;
  country: string | null;
  city: string;
  timezone: string | null;
}

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
      role: '',
      speciality: null,
      birthday: null,
      country: null,
      city: '',
      timezone: '(UTC) Coordinated Universal Time',
    },
  });

  const role = watch('role');

  const countryOptions = countries.map((country) => {
    const option = { value: country.name, label: country.name };
    return option;
  });

  const timezoneOptions = timezones.map((timezone) => {
    const option = {
      value: timezone.text,
      label: timezone.text,
      offset: timezone.offset,
    };
    return option;
  });
  // (data) => console.log(data));

  const onSubmit = handleSubmit(() => {});
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <LabelShort htmlFor="firstName">
            <LabelText>{t('regForm.firstName')}</LabelText>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  status={errors.firstName?.message ? 'error' : undefined}
                  placeholder="Enter your first name"
                  {...field}
                />
              )}
            />
            <ErrorMsg>{errors.firstName?.message}</ErrorMsg>
          </LabelShort>
          <LabelShort htmlFor="lastName">
            <LabelText>{t('regForm.lastName')}</LabelText>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  status={errors.lastName?.message ? 'error' : undefined}
                  placeholder="Enter your last name"
                  {...field}
                />
              )}
            />
            <ErrorMsg>{errors.lastName?.message}</ErrorMsg>
          </LabelShort>
        </InputContainer>
        <Label htmlFor="email">
          <LabelText>{t('regForm.email')}</LabelText>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                status={errors.email?.message ? 'error' : undefined}
                placeholder="Enter your email"
                {...field}
              />
            )}
          />
          <ErrorMsg>{errors.email?.message}</ErrorMsg>
        </Label>
        <PasswordContainer>
          <InputContainer>
            <LabelShort htmlFor="password">
              <LabelText>{t('regForm.password')}</LabelText>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    status={errors.password?.message ? 'error' : undefined}
                    placeholder="Enter your password"
                    {...field}
                  />
                )}
              />
            </LabelShort>
            <LabelShort htmlFor="password">
              <LabelText>{t('regForm.passwordRepeat')}</LabelText>
              <Controller
                name="passwordRepeat"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    status={
                      errors.passwordRepeat?.message ? 'error' : undefined
                    }
                    placeholder="Repeat your password"
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
          <LabelText>{t('regForm.role')}</LabelText>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <StyledSelect
                placeholder="Select your time zone"
                status={errors.role?.message ? 'error' : undefined}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                {...field}
                options={[
                  { value: 'local', label: 'Local doctor' },
                  { value: 'remote', label: 'Remote doctor' },
                ]}
              />
            )}
          />
          <ErrorMsg>{errors.role?.message}</ErrorMsg>
        </Label>
        {role === ROLES.REMOTE && (
          <Label htmlFor="speciality">
            <LabelText>{t('regForm.speciality')}</LabelText>
            <Controller
              name="speciality"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <StyledSelect
                  placeholder="Select your speciality"
                  status={errors.speciality?.message ? 'error' : undefined}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  {...field}
                  options={[
                    { value: 'surgeon', label: 'Surgeon' },
                    { value: 'neurologist', label: 'Neurologist' },
                    { value: 'plastic', label: 'Plastic surgeon' },
                    { value: 'ophthalmologist', label: 'Ophthalmologist' },
                    { value: 'dermatologist', label: 'Dermatologist' },
                  ]}
                />
              )}
            />
            <ErrorMsg>{errors.speciality?.message}</ErrorMsg>
          </Label>
        )}

        <Label htmlFor="birthday">
          <LabelText>{t('regForm.birthday')}</LabelText>
          <Controller
            name="birthday"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StyledDatePicker
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
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
          <ErrorMsg>{errors.birthday?.message}</ErrorMsg>
        </Label>
        <InputContainer>
          <LabelShort htmlFor="country">
            <LabelText>{t('regForm.country')}</LabelText>
            <Controller
              name="country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <StyledSelect
                  showSearch
                  placeholder="Select your country"
                  status={errors.country?.message ? 'error' : undefined}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  {...field}
                  options={countryOptions}
                />
              )}
            />
            <ErrorMsg>{errors.country?.message}</ErrorMsg>
          </LabelShort>
          <LabelShort htmlFor="city">
            <LabelText>{t('regForm.city')}</LabelText>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  status={errors.city?.message ? 'error' : undefined}
                  placeholder="Enter your city"
                  {...field}
                />
              )}
            />
            <ErrorMsg>{errors.city?.message}</ErrorMsg>
          </LabelShort>
        </InputContainer>
        <Label htmlFor="timezone">
          <LabelText>{t('regForm.timezone')}</LabelText>
          <Controller
            name="timezone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StyledSelect
                showSearch
                placeholder="Select your time zone"
                defaultValue={'(UTC) Coordinated Universal Time'}
                status={errors.timezone?.message ? 'error' : undefined}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                // {...field}
                onChange={(data) => {
                  field.onChange(data);
                }}
                options={timezoneOptions}
              />
            )}
          />
          <ErrorMsg>{errors.timezone?.message}</ErrorMsg>
        </Label>
        <BtnContainer>
          <Btn type="primary" htmlType="submit">
            Sign Up
          </Btn>
          <NavLink to="/">
            <BackBtn type="primary" htmlType="button">
              Back to Login
            </BackBtn>
          </NavLink>
        </BtnContainer>
      </Form>
    </Container>
  );
}

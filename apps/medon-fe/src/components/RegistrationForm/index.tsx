import { Controller, useForm } from 'react-hook-form';
import { Select, DatePicker, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { registrationFormSchema } from '../../validation/registrationFormSchema';
import countries from '../../utils/countries.json';
import timezones from '../../utils/timezones.json';
import { Form, InputContainer, NameLabel } from './styles';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
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
      timezone: null,
    },
  });

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

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Form onSubmit={onSubmit}>
      <InputContainer>
        <NameLabel htmlFor="firstName">
          <p>{t('regForm.firstName')}</p>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                style={{ width: 190 }}
                status={errors.firstName?.message ? 'error' : undefined}
                placeholder="Enter your first name"
                {...field}
              />
            )}
          />
          <p>{errors.firstName?.message}</p>
        </NameLabel>
        <NameLabel htmlFor="lastName">
          <p>{t('regForm.lastName')}</p>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                style={{ width: 190 }}
                status={errors.lastName?.message ? 'error' : undefined}
                placeholder="Enter your last name"
                {...field}
              />
            )}
          />
          <p>{errors.lastName?.message}</p>
        </NameLabel>
      </InputContainer>
      <label htmlFor="email">
        <p>{t('regForm.email')}</p>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              style={{ width: 400 }}
              status={errors.email?.message ? 'error' : undefined}
              placeholder="Enter your email"
              {...field}
            />
          )}
        />
        <p>{errors.email?.message}</p>
      </label>
      <div>
        <InputContainer>
          <label htmlFor="password">
            <p>{t('regForm.password')}</p>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  style={{ width: 190 }}
                  status={errors.password?.message ? 'error' : undefined}
                  placeholder="Enter your password"
                  {...field}
                />
              )}
            />
          </label>
          <label htmlFor="password">
            <p>{t('regForm.passwordConfirm')}</p>
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <Input.Password
                  style={{ width: 190 }}
                  status={errors.passwordConfirm?.message ? 'error' : undefined}
                  placeholder="Repeat your password"
                  {...field}
                />
              )}
            />
          </label>
        </InputContainer>
        <p>
          {errors.password?.message
            ? errors.password?.message
            : errors.passwordConfirm?.message}
        </p>
      </div>
      <label htmlFor="role">
        <p>{t('regForm.role')}</p>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              style={{ width: 400 }}
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
        <p>{errors.role?.message}</p>
      </label>
      <label htmlFor="speciality">
        <p>{t('regForm.speciality')}</p>
        <Controller
          name="speciality"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Select
              style={{ width: 400 }}
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
        <p>{errors.speciality?.message}</p>
      </label>
      <label htmlFor="birthday">
        <p>{t('regForm.birthday')}</p>
        <Controller
          name="birthday"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              style={{ width: 400 }}
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
        <p>{errors.birthday?.message}</p>
      </label>
      <InputContainer>
        <label htmlFor="country">
          <p>{t('regForm.country')}</p>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                showSearch
                style={{ width: 190 }}
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
          <p>{errors.country?.message}</p>
        </label>
        <label htmlFor="city">
          <p>{t('regForm.city')}</p>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                style={{ width: 190 }}
                status={errors.city?.message ? 'error' : undefined}
                placeholder="Enter your city"
                {...field}
              />
            )}
          />
          <p>{errors.city?.message}</p>
        </label>
      </InputContainer>
      <label htmlFor="timezone">
        <p>{t('regForm.timezone')}</p>
        <Controller
          name="timezone"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              showSearch
              defaultValue="(UTC) Coordinated Universal Time"
              style={{ width: 400 }}
              placeholder="Select your time zone"
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
        <p>{errors.timezone?.message}</p>
      </label>

      <input type="submit" />
    </Form>
  );
}

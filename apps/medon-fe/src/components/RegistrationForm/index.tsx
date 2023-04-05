import { Controller, useForm } from 'react-hook-form';
import { Select, DatePicker, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
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
          <p>First name</p>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                style={{ width: 190 }}
                placeholder="Enter your first name"
                {...field}
              />
            )}
          />
          <p>{errors.firstName?.message}</p>
        </NameLabel>
        <NameLabel htmlFor="lastName">
          <p>Last name</p>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                style={{ width: 190 }}
                placeholder="Enter your last name"
                {...field}
              />
            )}
          />
          <p>{errors.lastName?.message}</p>
        </NameLabel>
      </InputContainer>
      <label htmlFor="email">
        <p>Email</p>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              style={{ width: 400 }}
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
            <p>Password</p>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  style={{ width: 190 }}
                  placeholder="Enter your password"
                  {...field}
                />
              )}
            />
          </label>
          <label htmlFor="password">
            <p>Repeat password</p>
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <Input.Password
                  style={{ width: 190 }}
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
        <p>Role</p>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              style={{ width: 400 }}
              placeholder="Select your time zone"
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
        <p>Speciality</p>
        <Controller
          name="speciality"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Select
              style={{ width: 400 }}
              placeholder="Select your speciality"
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
        <p>Birthday</p>
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
                if (date) {
                  console.log(date.valueOf());
                }
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
          <p>Country</p>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                showSearch
                style={{ width: 190 }}
                placeholder="Select your country"
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
          <p>City</p>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                style={{ width: 190 }}
                placeholder="Enter your city"
                {...field}
              />
            )}
          />
          <p>{errors.city?.message}</p>
        </label>
      </InputContainer>
      <label htmlFor="timezone">
        <p>Time zone</p>
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
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              // {...field}
              onChange={(data) => {
                if (data) {
                  console.log(data);
                }
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

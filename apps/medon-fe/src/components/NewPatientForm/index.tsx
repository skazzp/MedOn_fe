import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import { LinkGoBack } from 'components/LinkGoBack';
import { Sex } from 'utils/constants/sex';
import countries from 'utils/countries/countries.json';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Container } from './styles';

export function NewPatientForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <>
      <LinkGoBack>Back to Patients list</LinkGoBack>
      <Container>
        <h1>Add New Patient</h1>
        <label htmlFor="name">First Name</label>
        <input type="text" id="firstName" placeholder="First Name" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" placeholder="Last Name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Email" />
        <label htmlFor="sex">Email</label>
        <select id="sex">
          <option value={Sex.Male}>Male</option>
          <option value={Sex.Female} selected>
            Female
          </option>
        </select>
        <label htmlFor="country">Country</label>
        <select id="country">
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <label htmlFor="city">City</label>
        <input type="text" id="city" placeholder="City" />
        <PhoneInput
          placeholder="Enter phone number"
          defaultCountry="US"
          international
          onChange={() => {}}
        />
        <label htmlFor="overview">Overview</label>
        <textarea id="overview" />
        <Button>Save</Button>
      </Container>
    </>
  );
}

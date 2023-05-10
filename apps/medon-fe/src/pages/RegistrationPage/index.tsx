import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import RegistrationForm from 'components/RegistrationForm';
import RegistrationConfirmation from 'components/RegistrationConfirmation';
import { FormData } from 'components/RegistrationForm/types';
import { useRegisterUserMutation } from 'redux/api/authApi';
import { roles } from 'utils/constants/roles';
import logo from 'assets/images/logo.svg';
import { toastConfig } from 'utils/toastConfig';
import {
  Container,
  FormContainer,
  RegContainer,
  Sidebar,
  Text,
  Title,
} from './styles';

export default function RegistrationPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [registerUser, { isSuccess }] = useRegisterUserMutation();

  const submitForm = async (values: FormData) => {
    const requestData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      dateOfBirth: dayjs(values.birthday).format('YYYY-MM-DD'),
      role: values.role,
      specialityId:
        values.role === roles.remote && values.speciality
          ? +values.speciality
          : null,
      country: values.country,
      city: values.city,
      timeZone: values.timezone,
    };

    try {
      await registerUser(requestData).unwrap();
      setEmail(values.email);
    } catch (err) {
      toast.error('Registration error, try again!', toastConfig);
    }
  };

  return (
    <Container>
      <RegContainer>
        <div>
          <img src={logo} alt={`${t('logoAlt')}`} />
        </div>
        <FormContainer>
          {!isSuccess ? (
            <>
              <Title>{t('regPage.title')}</Title>
              <Text>{t('regPage.instruction')}</Text>
              <RegistrationForm submitForm={submitForm} />
            </>
          ) : (
            <RegistrationConfirmation email={email}></RegistrationConfirmation>
          )}
        </FormContainer>
      </RegContainer>
      <Sidebar></Sidebar>;
    </Container>
  );
}

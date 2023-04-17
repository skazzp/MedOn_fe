import RegistrationForm from 'components/RegistrationForm';
import { useTranslation } from 'react-i18next';
import logo from 'assets/images/logo.svg';
import RegistrationConfirmation from 'components/RegistrationConfirmation';
import { useState } from 'react';
import { FormData } from 'components/RegistrationForm/types';
import { ROLES } from 'utils/constants/roles';
import { useRegisterUserMutation } from 'redux/api/authApi';
import { toast } from 'react-toastify';
import { toastConfig } from 'utils/toastConfig';
import dayjs from 'dayjs';
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
        values.role === ROLES.REMOTE && values.speciality
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

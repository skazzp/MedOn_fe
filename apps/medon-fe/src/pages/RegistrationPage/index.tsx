import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import RegistrationForm from 'components/RegistrationForm';
import RegistrationConfirmation from 'components/RegistrationConfirmation';
import TermsAndConditions from 'components/TermsAndConditions';
import PrivacyPolicy from 'components/PrivacyPolicy';
import { FormData } from 'components/RegistrationForm/types';
import Logo from 'components/Logo';

import { useRegisterUserMutation } from 'redux/api/authApi';
import { roles } from 'utils/constants/roles';
import { toastConfig } from 'utils/toastConfig';
import {
  Container,
  Footer,
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
        <Logo />
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
        <Footer>
          <TermsAndConditions />
          <PrivacyPolicy />
        </Footer>
      </RegContainer>
      <Sidebar></Sidebar>
    </Container>
  );
}

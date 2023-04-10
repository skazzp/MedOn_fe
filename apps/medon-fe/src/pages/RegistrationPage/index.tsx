import RegistrationForm from 'components/RegistrationForm';
import { useTranslation } from 'react-i18next';
import AuthSidebar from 'components/AuthSidebar';
import logo from 'assets/images/logo.svg';
import { useState } from 'react';
import RegistrationConfirmation from 'components/RegistrationConfirmation';
import { Container, FormContainer, RegContainer, Text, Title } from './styles';

export default function RegistrationPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('1');

  return (
    <Container>
      <RegContainer>
        <div>
          <img src={logo} alt="MedOn Logo" />
        </div>
        <FormContainer>
          {!email ? (
            <>
              <Title>{t('regPage.title')}</Title>
              <Text>{t('regPage.instruction')}</Text>
              <RegistrationForm setRegSuccess={setEmail} />
            </>
          ) : (
            <RegistrationConfirmation email={email}></RegistrationConfirmation>
          )}
        </FormContainer>
      </RegContainer>
      <AuthSidebar />
    </Container>
  );
}

import RegistrationForm from 'components/RegistrationForm';
import { useTranslation } from 'react-i18next';
import logo from 'assets/images/logo.svg';
import RegistrationConfirmation from 'components/RegistrationConfirmation';
import { useState } from 'react';
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

  return (
    <Container>
      <RegContainer>
        <div>
          <img src={logo} alt={`${t('logoAlt')}`} />
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
      <Sidebar></Sidebar>;
    </Container>
  );
}

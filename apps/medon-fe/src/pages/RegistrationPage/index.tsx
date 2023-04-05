import RegistrationForm from 'components/RegistrationForm';
import { useTranslation } from 'react-i18next';
import logo from 'assets/images/logo.svg';
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
  return (
    <Container>
      <RegContainer>
        <div>
          <img src={logo} alt="MedOn Logo" />
        </div>
        <FormContainer>
          <Title>{t('regPage.title')}</Title>
          <Text>{t('regPage.instruction')}</Text>
          <RegistrationForm />
        </FormContainer>
      </RegContainer>
      <Sidebar></Sidebar>
    </Container>
  );
}

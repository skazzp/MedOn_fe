import RegistrationForm from 'components/RegistrationForm';
import { useTranslation } from 'react-i18next';
import { FormContainer } from './styles';
import logo from '../../assets/images/logo.svg';

export default function RegistrationPage() {
  const { t } = useTranslation();
  return (
    <FormContainer>
      <div>
        <img src={logo} alt="MedOn Logo" />
      </div>
      <h1>{t('regPage.title')}</h1>
      <p>{t('regPage.instruction')}</p>
      <RegistrationForm />
    </FormContainer>
  );
}

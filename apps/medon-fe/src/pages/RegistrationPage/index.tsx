import RegistrationForm from 'components/RegistrationForm';
import { useTranslation } from 'react-i18next';
import logo from 'assets/images/logo.svg';
import { useEffect, useState } from 'react';
import { useVerifyEmailQuery } from 'redux/api/authApi';
import { useSearchParams } from 'react-router-dom';
import RegistrationConfirmation from 'components/RegistrationConfirmation';
import { toast } from 'react-toastify';
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
  const [params] = useSearchParams();
  const token = params.get('token');
  const { isSuccess, error, data } = useVerifyEmailQuery(
    { token },
    {
      skip: !token,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('regConfirm.msgSuccess'), toastConfig);
    }
    if (error && 'message' in error) {
      console.log(error?.message);
      toast.error(error?.message, toastConfig);
    }
  }, [isSuccess, data, error, t]);

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

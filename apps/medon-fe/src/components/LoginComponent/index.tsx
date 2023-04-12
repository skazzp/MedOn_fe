import LoginForm, { LoginFormValues } from 'components/LoginForm';
import { FormContainer } from 'components/LoginForm/style';
import Logo from 'components/Logo';
import { Title, Text } from 'components/LoginComponent/style';
import { useVerifyEmailQuery } from 'redux/api/authApi';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toastConfig } from 'utils/toastConfig';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function LoginComponent() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const token = params.get('token');
  const { isSuccess, error, data } = useVerifyEmailQuery(
    { token },
    {
      skip: !token,
    }
  );

  const handleSubmit = (values: LoginFormValues) => values;

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('regConfirm.msgEmailSuccess'), toastConfig);
    }
    if (error) {
      toast.error(t('regConfirm.msgEmailError'), toastConfig);
    }
  }, [isSuccess, data, error, t]);

  return (
    <FormContainer>
      <Logo />
      <Title>{t('login.login-title')}</Title>
      <Text>{t('login.login-text')}</Text>
      <LoginForm onSubmit={handleSubmit} />
    </FormContainer>
  );
}

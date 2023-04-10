import { t } from 'i18next';

import LoginForm, { LoginFormValues }  from 'components/LoginForm';
import { FormContainer } from 'components/LoginForm/style';
import Logo from 'components/Logo';
import { Title, Text } from 'components/LoginComponent/style';



export default function LoginComponent() {

  const handleSubmit = (data: LoginFormValues) =>  data
  

  return (
    <FormContainer>
      <Logo />
      <Title>{t('login.login-title')}</Title>
      <Text>{t('login.login-text')}</Text>
      <LoginForm onSubmit={handleSubmit} />
    </FormContainer>
  );
}

import { t } from 'i18next';

import LoginForm  from 'components/LoginForm';
import { FormContainer } from 'components/LoginForm/style';
import Logo from 'components/Logo';
import { Title, Text } from 'components/LoginComponent/style';
import { IUser } from 'redux/api/types';


export default function LoginComponent() {

  const handleSubmit = (data: IUser) =>  data
  
  return (
    <FormContainer>
      <Logo />
      <Title>{t('login.login-title')}</Title>
      <Text>{t('login.login-text')}</Text>
      <LoginForm onSubmit={handleSubmit} />
    </FormContainer>
  );
}

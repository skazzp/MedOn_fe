import LoginForm from 'components/LoginForm';
import { FormContainer } from 'components/LoginForm/style';
import Logo from 'components/Logo';
import { Title, Text, Footer, Wrapper } from 'components/LoginComponent/style';
import { useVerifyEmailQuery } from 'redux/api/authApi';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toastConfig } from 'utils/toastConfig';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/hooks';
import { setIsVerified, setToken } from 'redux/features/userSlice/userSlice';
import TermsAndConditions from 'components/TermsAndConditions';
import PrivacyPolicy from 'components/PrivacyPolicy';

export default function LoginComponent() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const token = params.get('token');
  const authToken = params.get('gtoken');
  const verifyEmail = useVerifyEmailQuery(
    { token },
    {
      skip: !token,
    }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (verifyEmail.isSuccess) {
      dispatch(setIsVerified(true));
      toast.success(t('regConfirm.msgVerifySuccess'), toastConfig);
    }
    if (verifyEmail.error) {
      toast.error(t('regConfirm.msgVerifyError'), toastConfig);
    }
  }, [verifyEmail.isSuccess, verifyEmail.error, t, dispatch]);

  useEffect(() => {
    if (authToken) {
      dispatch(setIsVerified(true));
      dispatch(setToken(authToken));
    }
  }, [authToken, dispatch]);

  return (
    <Wrapper>
      <Logo />
      <FormContainer>
        <Title>{t('login.login-title')}</Title>
        <Text>{t('login.login-text')}</Text>
        <LoginForm />
      </FormContainer>
      <Footer>
        <TermsAndConditions />
        <PrivacyPolicy />
      </Footer>
    </Wrapper>
  );
}

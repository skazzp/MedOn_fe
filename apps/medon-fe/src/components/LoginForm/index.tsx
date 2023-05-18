import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import Icon from '@ant-design/icons/lib/components/Icon';

import { useAppDispatch } from 'redux/hooks';
import { LoginRequest } from 'redux/api/types';
import { loginFormSchema } from 'validation/loginSchema';
import { setIsVerified, setToken } from 'redux/features/userSlice/userSlice';
import { userApi } from 'redux/api/userApi';
import { useLoginMutation } from 'redux/api/authApi';
import { ReactComponent as googleLogo } from 'assets/svgs/google_logo.svg';
import {
  Form,
  DontHaveButton,
  ForgotButton,
  SendButton,
  GoogleBtn,
} from 'components/LoginForm/style';
import { routes } from 'utils/constants';
import { toastConfig } from 'utils/toastConfig';
import { availabilityApi } from 'redux/api/availabilityApi';
import { InputAntD, InputPasswordAntD } from 'components/common';

const LoginForm: FC = () => {
  const { t } = useTranslation();
  const [login, { isLoading, data }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { control, handleSubmit: handleFormSubmit } = useForm<LoginRequest>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmitHandler = async (formData: LoginRequest) => {
    try {
      dispatch(userApi.util.invalidateTags(['user']));
      dispatch(availabilityApi.util.invalidateTags(['availability']));
      await login(formData).unwrap();
      navigate(routes.dashboard);
    } catch (error) {
      toast.error(t('login.error-msg'), toastConfig);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setIsVerified(data.isVerified));
      dispatch(setToken(data.token));
    }
  }, [data, dispatch, navigate]);

  return (
    <Form
      name="contact"
      method="post"
      onSubmit={handleFormSubmit(onSubmitHandler)}
    >
      <label htmlFor="email">
        {t('login.email')}
        <InputAntD
          name="email"
          control={control}
          size="large"
          placeholder={`${t('login.placeholder-email')}`}
        />
      </label>
      <label htmlFor="password">
        {t('login.password')}
        <InputPasswordAntD
          name="password"
          size="large"
          control={control}
          placeholder={`${t('login.placeholder-password')}`}
        />
      </label>
      <ForgotButton type="link" href="/forget-password">
        {t('login.login-forgot-password')}
      </ForgotButton>
      {isLoading ? (
        <Spin />
      ) : (
        <SendButton
          type="submit"
          size="large"
          value={`${t('login.login')}`}
          disabled={isLoading}
        />
      )}
      <GoogleBtn
        size="large"
        href={`${process.env.NX_API_URL}${process.env.NX_API_GOOGLE_ROUTE}`}
      >
        <Icon component={googleLogo} />
        {t('login.googleBtn')}
      </GoogleBtn>
      <DontHaveButton type="link" href="/register">
        {t('login.dont-have')}
      </DontHaveButton>
    </Form>
  );
};

export default LoginForm;

import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Spin } from 'antd';

import {
  StyledErrorMessage,
  Form,
  DontHaveButton,
  ForgotButton,
  SendButton,
} from 'components/LoginForm/style';
import { loginFormSchema } from 'components/FormSchema/index';
import { LoginRequest } from 'redux/api/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastConfig } from 'utils/toastConfig';
import { useAppDispatch } from 'redux/hooks';
import { setIsVerified, setToken } from 'redux/features/userSlice/userSlice';
import { useLoginMutation } from 'redux/api/authApi';

export interface LoginFormProps {
  onSubmit: (data: LoginRequest) => void;
}

const LoginForm: FC<LoginFormProps> = () => {
  const { t } = useTranslation();
  const [login, { isLoading, data }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleFormSubmit = async (formData: LoginRequest) => {
    try {
      await login(formData).unwrap();
    } catch (error) {
      toast.error(t('login.error-msg'), toastConfig);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setIsVerified(data.user.isVerified));
      dispatch(setToken(data.token));
    }
  }, [data, dispatch, navigate]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Form
      name="contact"
      method="post"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <label htmlFor="email">
        {t('login.email')}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              status={errors.email ? 'error' : ''}
              {...field}
              id="email"
              type="email"
              placeholder={`${t('login.placeholder-email')}`}
            />
          )}
        />
        {errors.email && (
          <StyledErrorMessage>{errors.email.message}</StyledErrorMessage>
        )}
      </label>

      <label htmlFor="password">
        {t('login.password')}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              status={errors.password ? 'error' : ''}
              {...field}
              id="password"
              type="password"
              placeholder={`${t('login.placeholder-password')}`}
            />
          )}
        />
        {errors.password && (
          <StyledErrorMessage>{errors.password.message}</StyledErrorMessage>
        )}
      </label>
      <ForgotButton type="link" href="/forget-password">
        {t('login.login-forgot-password')}
      </ForgotButton>
      <SendButton
        type="submit"
        value={`${t('login.login')}`}
        disabled={isLoading}
      />
      <DontHaveButton type="link" href="/register">
        {t('login.dont-have')}
      </DontHaveButton>
    </Form>
  );
};

export default LoginForm;

import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'antd';

import {
  StyledErrorMessage,
  Form,
  DontHaveButton,
  ForgotButton,
  SendButton,
} from 'components/LoginForm/style';
import { loginFormSchema } from 'components/FormSchema/index';
import { useLoginMutation } from 'redux/api/login.api';
import { IUser } from 'redux/api/types';


export interface LoginFormProps {
  onSubmit: (data: IUser) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [login, { isLoading, isError, error, data }] = useLoginMutation()
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleFormSubmit = async (formData: IUser) => {
    try {
      const response = await login(formData).unwrap();
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  return (
      <Form name="contact" method="post" onSubmit={handleSubmit(handleFormSubmit)}>
      <label
        htmlFor="email">{t("login.email") }
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              status={errors.email ? 'error' : ''}
              {...field}
              id="email"
              type="email"
              placeholder={`${t("login.placeholder-email")}`}
            />
          )}
        />
        {errors.email && (
          <StyledErrorMessage>{errors.email.message}</StyledErrorMessage>
        )}
      </label>

      <label
        htmlFor="password">{t("login.password") }
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              status={errors.password ? 'error' : ''}
              {...field}
              id="password"
              type="password"
              placeholder={`${t("login.placeholder-password")}` }
            />
          )}
        />
        {errors.password && (
          <StyledErrorMessage>{errors.password.message}</StyledErrorMessage>
        )}
      </label>
        <ForgotButton type="link">{t('login.login-forgot-password')}</ForgotButton>
      <SendButton type="submit" value={`${t("login.login")}`} disabled={isLoading}/>
      <DontHaveButton type="link">{t("login.dont-have")}</DontHaveButton>
      </Form>
  );
};

export default LoginForm;

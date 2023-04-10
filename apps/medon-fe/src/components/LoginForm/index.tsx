import { FC } from 'react';
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



export interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

 const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
      <Form name="contact" method="post" onSubmit={handleFormSubmit}>
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
      <SendButton type="submit" value={`${t("login.login")}`} />
      <DontHaveButton type="link">{t("login.dont-have")}</DontHaveButton>
      </Form>
  );
};

export default LoginForm;

import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import Button from 'components/Button';
import Link from 'components/Link';

import RightArrow from 'assets/svgs/arrow/right-arrow.svg';
import Logo from 'assets/svgs/logo_medon.svg';

import { SubmitResetPasswordForm } from 'pages/ResetPassword/types';
import {
  Container,
  Content,
  Footer,
  Form,
  Header,
} from 'pages/ResetPassword/styles';

import { passwordSchema } from 'validation/forgotPasswordSchema';
import { usePostResetPasswordDoctorMutation } from 'redux/api/authApi';
import { InputPasswordAntD } from 'components/common';

export default function ResetPassword() {
  const [isPasswordSent, setIsPasswordSent] = useState(false);
  const { token } = useParams();
  const theme = useTheme();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<SubmitResetPasswordForm>({
    resolver: yupResolver(passwordSchema),
  });

  const [sendPassword, { isLoading }] = usePostResetPasswordDoctorMutation();

  const handleUpdatePassword: SubmitHandler<SubmitResetPasswordForm> = ({
    newPassword,
  }) => {
    sendPassword({
      newPassword,
      token,
    })
      .unwrap()
      .then(() => {
        setIsPasswordSent(true);
      });
  };

  return (
    <Container>
      <Header>
        <img
          src={Logo}
          alt={`${t('forget-password.alt.logo')}`}
          draggable={false}
        />
      </Header>
      <Content>
        <Form onSubmit={handleSubmit(handleUpdatePassword)}>
          {!isPasswordSent ? (
            <>
              <h1>{t('forget-password.reset-password.title')}</h1>
              <h3>{t('forget-password.reset-password.subtitle')}</h3>
              <InputPasswordAntD
                name="newPassword"
                size="large"
                control={control}
                placeholder={`${t(
                  'forget-password.reset-password.placeholder-newpassword'
                )}`}
              />
              <InputPasswordAntD
                name="confirmNewPassword"
                size="large"
                control={control}
                placeholder={`${t(
                  'forget-password.reset-password.placeholder-confirmpassword'
                )}`}
              />
              <Button
                bgcolor={theme.colors.btnGradient}
                textcolor={theme.colors.white}
                isLoading={isLoading}
              >
                {t('forget-password.reset-password.button')}
                <img
                  src={RightArrow}
                  alt={`${t('forget-password.alt.image')}`}
                />
              </Button>
            </>
          ) : (
            <>
              <h1>{t('forget-password.after-password.title')}</h1>
              <h3>{t('forget-password.after-password.subtitle')}</h3>
            </>
          )}
        </Form>
        <Link
          bgcolor={theme.colors.black}
          textcolor={theme.colors.white}
          to="/"
          isfullwidth="true"
        >
          {t('forget-password.send-email.home-link')}
        </Link>
      </Content>
      <Footer>
        <Link
          bgcolor={theme.colors.transparent}
          textcolor={theme.colors.blue_300}
          to="#"
        >
          {t('forget-password.footer.linkTerm')}
        </Link>
        <Link
          bgcolor={theme.colors.transparent}
          textcolor={theme.colors.blue_300}
          to="#"
        >
          {t('forget-password.footer.linkPrivacy')}
        </Link>
      </Footer>
    </Container>
  );
}

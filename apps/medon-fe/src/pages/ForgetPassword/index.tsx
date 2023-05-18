import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import LinkHome from 'components/Link';
import { InputAntD } from 'components/common';

import { SubmitSendEmail } from 'pages/ForgetPassword/types';
import {
  Container,
  Content,
  Footer,
  Form,
  Header,
} from 'pages/ForgetPassword/styles';

import RightArrow from 'assets/svgs/arrow/right-arrow.svg';
import Logo from 'assets/svgs/logo_medon.svg';

import { emailSchema } from 'validation/forgotPasswordSchema';
import { usePostForgetPasswordDoctorMutation } from 'redux/api/authApi';

export default function ForgetPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { handleSubmit, control } = useForm<SubmitSendEmail>({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const theme = useTheme();
  const { t } = useTranslation();
  const [sendEmail, { isLoading }] = usePostForgetPasswordDoctorMutation();

  const handleSentEmail: SubmitHandler<SubmitSendEmail> = (data) => {
    sendEmail({
      email: data.email,
    })
      .unwrap()
      .then(() => {
        setIsEmailSent(true);
      })
      .catch((err) => {
        toast.error(err.data?.message);
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
        <Form onSubmit={handleSubmit(handleSentEmail)}>
          {!isEmailSent ? (
            <>
              <h1>{t('forget-password.send-email.title')}</h1>
              <h3>{t('forget-password.send-email.subtitle')}</h3>
              <InputAntD
                control={control}
                name="email"
                size="large"
                placeholder={`${t(
                  'forget-password.send-email.placeholder-email'
                )}`}
              />
              <Button
                bgcolor={theme.colors.btnGradient}
                textcolor={theme.colors.white}
                isLoading={isLoading}
              >
                {t('forget-password.send-email.button')}
                <img
                  src={RightArrow}
                  alt={`${t('forget-password.alt.image')}`}
                />
              </Button>
            </>
          ) : (
            <>
              <h1>{t('forget-password.after-email.title')}</h1>
              <h3>{t('forget-password.after-email.subtitle')}</h3>
              <Button
                bgcolor={theme.colors.btnGradient}
                textcolor={theme.colors.white}
                isLoading={isLoading}
              >
                {t('forget-password.after-email.button')}
                <img
                  src={RightArrow}
                  alt={`${t('forget-password.send-email.alt-image')}`}
                />
              </Button>
            </>
          )}
        </Form>
        <LinkHome
          bgcolor={theme.colors.black}
          textcolor={theme.colors.white}
          to="/"
          isfullwidth="true"
        >
          {t('forget-password.send-email.home-link')}
        </LinkHome>
      </Content>
      <Footer>
        <LinkHome
          bgcolor={theme.colors.transparent}
          textcolor={theme.colors.blue_300}
          to="#"
        >
          {t('forget-password.footer.linkTerm')}
        </LinkHome>
        <LinkHome
          bgcolor={theme.colors.transparent}
          textcolor={theme.colors.blue_300}
          to="#"
        >
          {t('forget-password.footer.linkPrivacy')}
        </LinkHome>
      </Footer>
    </Container>
  );
}

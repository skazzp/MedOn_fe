import Button from 'components/Button';
import Input from 'components/Input';
import LinkHome from 'components/LinkHome';
import RightArrow from 'assets/svgs/arrow/right-arrow.svg';
import Logo from 'assets/svgs/logo_medon.svg';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useTheme } from 'styled-components';
import { SubmitSendEmail } from './ForgetPasswordTypes';

import {
  Container,
  Content,
  ErrorNotification,
  Footer,
  Form,
  Header,
} from './styles';

export default function ResetPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitSendEmail>();

  const theme = useTheme();
  const { t } = useTranslation();

  const handleSentEmail: SubmitHandler<SubmitSendEmail> = (data) => {
    // logic to send email
    setIsEmailSent(true);
  };

  return (
    <Container>
      <Header>
        <img src={Logo} alt="medon logo" />
      </Header>
      <Content>
        <Form onSubmit={handleSubmit(handleSentEmail)}>
          {!isEmailSent ? (
            <>
              <h1>{t('reset-password.send-email.title')}</h1>
              <h3>{t('reset-password.send-email.subtitle')}</h3>
              <Input
                placeholder="Email Address *"
                type="email"
                {...register('email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                })}
              />
              {errors.email && errors.email.type === 'required' && (
                <ErrorNotification>
                  {t('reset-password.send-email.email-error-required')}
                </ErrorNotification>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <ErrorNotification>
                  {t('reset-password.send-email.email-error-valid')}
                </ErrorNotification>
              )}
              <Button
                bgcolor={theme.colors.BLUE_500}
                textcolor={theme.colors.WHITE}
              >
                {t('reset-password.send-email.button')}
                <img src={RightArrow} alt="arrow pointing right" />
              </Button>
            </>
          ) : (
            <>
              <h1>{t('reset-password.after-email.title')}</h1>
              <h3>{t('reset-password.after-email.subtitle')}</h3>
              <Button
                bgcolor={theme.colors.BLUE_500}
                textcolor={theme.colors.WHITE}
              >
                {t('reset-password.after-email.button')}
                <img src={RightArrow} alt="arrow pointing right" />
              </Button>
            </>
          )}
        </Form>
        <LinkHome
          bgcolor={theme.colors.BLACK}
          textcolor={theme.colors.WHITE}
          to="/"
          isfullwidth="true"
        >
          {t('reset-password.send-email.home-link')}
        </LinkHome>
      </Content>
      <Footer>
        <Link to="#">{t('reset-password.footer.span1')}</Link>
        <Link to="#">{t('reset-password.footer.span2')}</Link>
      </Footer>
    </Container>
  );
}

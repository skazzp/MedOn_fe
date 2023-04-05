import Button from 'components/Button';
import Input from 'components/Input';
import LinkHome from 'components/LinkHome';

import RightArrow from 'assets/svgs/arrow/right-arrow.svg';
import Logo from 'assets/svgs/logo_medon.svg';

import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

import {
  Container,
  Content,
  ErrorNotification,
  Footer,
  Form,
  Header,
} from './styles';
import { SubmitResetPasswordForm } from './ResetPasswordTypes';

export default function ResetPassword() {
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const theme = useTheme();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SubmitResetPasswordForm>();

  const password = watch('newPassword', '');
  const confirmPassword = watch('confirmNewPassword', '');

  const handleSentEmail: SubmitHandler<SubmitResetPasswordForm> = (data) => {
    // logic to send email
    setIsPasswordUpdated(true);
  };

  return (
    <Container>
      <Header>
        <img src={Logo} alt="medon logo" />
      </Header>
      <Content>
        <Form onSubmit={handleSubmit(handleSentEmail)}>
          {!isPasswordUpdated ? (
            <>
              <h1>{t('reset-password.update-password.title')}</h1>
              <h3>{t('reset-password.update-password.subtitle')}</h3>
              <Input
                placeholder="New Password *"
                type="password"
                {...register('newPassword', {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+@$!%*?&])[A-Za-z\d-+@$!%*?&]{6,}$/,
                })}
              />
              <Input
                placeholder="Retry New Password *"
                type="password"
                {...register('confirmNewPassword', {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+@$!%*?&])[A-Za-z\d-+@$!%*?&]{6,}$/,
                })}
              />

              {errors.newPassword && errors.newPassword.type === 'required' && (
                <ErrorNotification>
                  {t('reset-password.update-password.password-error-required')}
                </ErrorNotification>
              )}
              {errors.newPassword && errors.newPassword.type === 'pattern' && (
                <ErrorNotification>
                  {t('reset-password.update-password.password-error-pattern')}
                </ErrorNotification>
              )}
              {password !== confirmPassword && confirmPassword && (
                <ErrorNotification>
                  {t('reset-password.update-password.password-match-error')}
                </ErrorNotification>
              )}

              <Button
                bgcolor={theme.colors.BLUE_500}
                textcolor={theme.colors.WHITE}
              >
                {t('reset-password.update-password.button')}
                <img src={RightArrow} alt="arrow pointing right" />
              </Button>
            </>
          ) : (
            <>
              <h1>{t('reset-password.after-password.title')}</h1>
              <h3>{t('reset-password.after-password.subtitle')}</h3>
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
        <Link to="#">{t('reset-password.footer.linkTerm')}</Link>
        <Link to="#">{t('reset-password.footer.linkPrivacy')}</Link>
      </Footer>
    </Container>
  );
}

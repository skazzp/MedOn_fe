import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'components/Button';
import Input from 'components/Input';
import LinkHome from 'components/LinkHome';

import RightArrow from 'assets/svgs/arrow/right-arrow.svg';

import { SubmitResetPasswordForm } from 'pages/UpdatePassword/types';
import { Container, Content, Footer, Form } from 'pages/UpdatePassword/styles';

import { passwordSchema } from 'validation/updatePasswordSchema';
import { Link } from 'react-router-dom';

export default function UpdatePassword() {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitResetPasswordForm>({
    resolver: yupResolver(passwordSchema),
  });

  const handleUpdatePassword: SubmitHandler<SubmitResetPasswordForm> = () => {
    //  logic
  };

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit(handleUpdatePassword)}>
          <h1>{t('update-password.reset-password.title')}</h1>
          <h3>{t('update-password.reset-password.subtitle')}</h3>
          <Input
            placeholder={`${t(
              'update-password.reset-password.placeholder-oldpassword'
            )}`}
            type="password"
            errorMessage={
              errors.currentPassword?.message
                ? t(`${errors.currentPassword?.message}`)
                : ''
            }
            {...register('currentPassword')}
          />
          <Input
            placeholder={`${t(
              'update-password.reset-password.placeholder-newpassword'
            )}`}
            type="password"
            errorMessage={
              errors.newPassword?.message
                ? t(`${errors.newPassword?.message}`)
                : ''
            }
            {...register('newPassword')}
          />
          <Input
            placeholder={`${t(
              'update-password.reset-password.placeholder-confirmpassword'
            )}`}
            type="password"
            errorMessage={
              errors.confirmNewPassword?.message
                ? t(`${errors.confirmNewPassword?.message}`)
                : ''
            }
            {...register('confirmNewPassword')}
          />
          <Button
            bgcolor={theme.colors.btnGradient}
            textcolor={theme.colors.white}
          >
            {t('update-password.reset-password.button')}
            <img src={RightArrow} alt={`${t('update-password.alt.image')}`} />
          </Button>
        </Form>
        <LinkHome
          bgcolor={theme.colors.black}
          textcolor={theme.colors.white}
          to="/"
          isfullwidth="true"
        >
          {t('update-password.reset-password.home-link')}
        </LinkHome>
      </Content>
      <Footer>
        <Link to="#">{t('update-password.footer.linkTerm')}</Link>
        <Link to="#">{t('update-password.footer.linkPrivacy')}</Link>
      </Footer>
    </Container>
  );
}

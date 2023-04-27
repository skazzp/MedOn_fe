import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import LinkHome from 'components/LinkHome';

import RightArrow from 'assets/svgs/arrow/right-arrow.svg';

import { SubmitResetPasswordForm } from 'pages/UpdatePassword/types';
import { Container, Content, Footer, Form } from 'pages/UpdatePassword/styles';
import { passwordSchema } from 'validation/updatePasswordSchema';
import { InputPasswordAntD } from 'components/common';

export default function UpdatePassword() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<SubmitResetPasswordForm>({
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
          <InputPasswordAntD
            name="currentPassword"
            control={control}
            size="large"
            placeholder={`${t(
              'update-password.reset-password.placeholder-oldpassword'
            )}`}
          />
          <InputPasswordAntD
            name="currentPassword"
            size="large"
            control={control}
            placeholder={`${t(
              'update-password.reset-password.placeholder-newpassword'
            )}`}
          />
          <InputPasswordAntD
            name="newPassword"
            size="large"
            control={control}
            placeholder={`${t(
              'update-password.reset-password.placeholder-confirmpassword'
            )}`}
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

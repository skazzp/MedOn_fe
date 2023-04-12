import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import Input from 'components/Input';
import LinkHome from 'components/LinkHome';
import RightArrow from 'assets/svgs/arrow/right-arrow.svg';
import Logo from 'assets/svgs/logo_medon.svg';
import {
  Container,
  Content,
  Footer,
  Form,
  Header,
} from 'pages/ResendConfirmation/styles';
import { SubmitSendEmail } from 'pages/ResendConfirmation/types';
import { emailSchema } from 'validation/accountConfirmationSchema';

export default function ResendConfirmation() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitSendEmail>({
    resolver: yupResolver(emailSchema),
  });

  const theme = useTheme();
  const { t } = useTranslation();

  const handleSentEmail: SubmitHandler<SubmitSendEmail> = () => {
    setIsEmailSent(true);
  };

  return (
    <Container>
      <Header>
        <img
          src={Logo}
          alt={`${t('re-confirm-account.logo.alt')}`}
          draggable={false}
        />
      </Header>
      <Content>
        <Form onSubmit={handleSubmit(handleSentEmail)}>
          {!isEmailSent ? (
            <>
              <h1>{t('re-confirm-account.send-email.title')}</h1>
              <h3>{t('re-confirm-account.send-email.subtitle')}</h3>
              <Input
                placeholder="Email Address *"
                type="email"
                errorMessage={errors.email?.message}
                {...register('email')}
              />
              <Button
                bgcolor={theme.colors.blue_500}
                textcolor={theme.colors.white}
              >
                {t('re-confirm-account.send-email.button')}
                <img src={RightArrow} alt="arrow pointing right" />
              </Button>
            </>
          ) : (
            <>
              <h1>{t('re-confirm-account.after-email.title')}</h1>
              <h3>{t('re-confirm-account.after-email.subtitle')}</h3>
            </>
          )}
        </Form>
        <LinkHome
          bgcolor={theme.colors.black}
          textcolor={theme.colors.white}
          to="/"
          isfullwidth="true"
        >
          {t('re-confirm-account.send-email.home-link')}
        </LinkHome>
      </Content>
      <Footer>
        <Link to="#">{t('re-confirm-account.footer.linkTerm')}</Link>
        <Link to="#">{t('re-confirm-account.footer.linkPrivacy')}</Link>
      </Footer>
    </Container>
  );
}

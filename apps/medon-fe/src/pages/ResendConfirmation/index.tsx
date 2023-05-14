import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { toastConfig } from 'utils/toastConfig';

import Button from 'components/Button';
import Input from 'components/Input';
import Link from 'components/Link';
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
import { useResendEmailMutation } from 'redux/api/authApi';
import { persistedStore } from 'redux/store';
import { useAppDispatch } from 'redux/hooks';
import { logout } from 'redux/features/userSlice/userSlice';

export default function ResendConfirmation() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const dispatch = useAppDispatch();
  const [resendEmail] = useResendEmailMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitSendEmail>({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const theme = useTheme();
  const { t } = useTranslation();

  const handleSentEmail: SubmitHandler<SubmitSendEmail> = async (
    data: SubmitSendEmail
  ) => {
    try {
      await resendEmail(data.email).unwrap();
      setIsEmailSent(true);
      toast.success(t('regConfirm.msgEmailSuccess'), toastConfig);
    } catch (error) {
      toast.error(t('regConfirm.msgEmailError'), toastConfig);
    }
  };

  useEffect(() => {
    persistedStore.purge();
    dispatch(logout());
  }, [dispatch]);

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
                errorMessage={
                  errors.email?.message ? t(`${errors.email?.message}`) : ''
                }
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
        <Link
          bgcolor={theme.colors.black}
          textcolor={theme.colors.white}
          to="/"
          isfullwidth="true"
        >
          {t('re-confirm-account.send-email.home-link')}
        </Link>
      </Content>
      <Footer>
        <Link
          bgcolor={theme.colors.transparent}
          textcolor={theme.colors.blue_300}
          to="#"
        >
          {t('re-confirm-account.footer.linkTerm')}
        </Link>
        <Link
          bgcolor={theme.colors.transparent}
          textcolor={theme.colors.blue_300}
          to="#"
        >
          {t('re-confirm-account.footer.linkPrivacy')}
        </Link>
      </Footer>
    </Container>
  );
}

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useVerifyEmailMutation } from 'redux/api/authApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { BackBtn, Btn, Container, Text, Title } from './styles';

interface IProps {
  email: string;
}

export default function RegistrationConfirmation({ email }: IProps) {
  const { t } = useTranslation();
  const [verifyEmail, { isSuccess, error, isError, data }] =
    useVerifyEmailMutation();
  const handleResendEmail = () => {
    // console.log(email);
    verifyEmail(email);
  };
  useEffect(() => {
    if (isError) {
      // console.log('Error: ', error);
      toast.success('Email send error, try again!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      // console.log('Error: ', error);
      toast.error('Email send error, try again!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isError]);

  return (
    <Container>
      <Title>Confirm your email address</Title>
      <Text>Please check your email for the next step to signup.</Text>
      <Text>If you have any issues, contact our support</Text>
      <Btn type="primary" htmlType="submit" onClick={handleResendEmail}>
        RESEND LINK
      </Btn>

      <NavLink to="/">
        <BackBtn type="primary" htmlType="button">
          {t('regForm.backBtn')}
        </BackBtn>
      </NavLink>
    </Container>
  );
}

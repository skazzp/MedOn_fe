import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useResendEmailMutation } from 'redux/api/authApi';
import { toastConfig } from 'utils/toastConfig';
import { BackBtn, Btn, Container, Text, Title } from './styles';

interface IProps {
  email: string;
}

export default function RegistrationConfirmation({ email }: IProps) {
  const { t } = useTranslation();

  const [resendEmail] = useResendEmailMutation();

  const handleResendEmail = async () => {
    try {
      await resendEmail(email).unwrap();
      toast.success(t('regConfirm.msgEmailSuccess'), toastConfig);
    } catch (error) {
      toast.error(t('regConfirm.msgEmailError'), toastConfig);
    }
  };

  return (
    <Container>
      <Title>{t('regConfirm.title')}</Title>
      <Text>{t('regConfirm.text1')}</Text>
      <Text>{t('regConfirm.text2')}</Text>
      <Btn type="primary" htmlType="submit" onClick={handleResendEmail}>
        {t('regConfirm.btnResend')}
      </Btn>
      <NavLink to="/login">
        <BackBtn type="primary" htmlType="button">
          {t('regForm.backBtn')}
        </BackBtn>
      </NavLink>
    </Container>
  );
}

import Button from 'components/Button';
import Input from 'components/Input';
import LinkHome from 'components/LinkHome';

import RightArrow from 'assets/svgs/arrow/right-arrow.svg';
import Logo from 'assets/svgs/logo_medon.svg';

import { useTheme } from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Content, Footer, Form, Header } from './styles';

export default function ResetPassword() {
  const theme = useTheme();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <img src={Logo} alt="medon logo" />
      </Header>
      <Content>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setIsEmailSent(true);
          }}
        >
          {isEmailSent ? (
            <h1>Test</h1>
          ) : (
            <>
              <h1>{t('reset-password.send-email.title')}</h1>
              <h3>{t('reset-password.send-email.subtitle')}</h3>
              <Input
                placeholder="Email Address *"
                type="email"
                min={10}
                required
              />
              <Button
                bgColor={theme.colors.BLUE_500}
                textColor={theme.colors.WHITE}
              >
                {t('reset-password.send-email.button')}
                <img src={RightArrow} alt="arrow pointing right" />
              </Button>
            </>
          )}
        </Form>
        <LinkHome
          bgColor={theme.colors.BLACK}
          textColor={theme.colors.WHITE}
          isFullWidth
        >
          {t('reset-password.send-email.home-link')}
        </LinkHome>
      </Content>
      <Footer>
        <span>{t('reset-password.footer.span1')}</span>
        <span>{t('reset-password.footer.span2')}</span>
      </Footer>
    </Container>
  );
}

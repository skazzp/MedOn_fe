import { useTranslation } from 'react-i18next';
import { Container, Title } from './styles';

export default function ExampleComponent() {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t('title')}</Title>
    </Container>
  );
}

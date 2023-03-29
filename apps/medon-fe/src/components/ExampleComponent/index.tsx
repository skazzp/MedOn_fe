import { Container, Title } from './styles';
import { useTranslation } from 'react-i18next';

interface IProps {}

export default function ExampleComponent({}: IProps) {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t('title')}</Title>
    </Container>
  );
}

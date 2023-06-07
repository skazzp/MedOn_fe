import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Container, Dot, Subtitle, TextSubtitle } from './styles';

export function Legend() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container>
      <legend>{t('patient-card.calendar.legend-title')}</legend>
      <Subtitle>
        <Dot color={theme.colors.purple} />
        <TextSubtitle>
          {t('patient-card.calendar.appointment-you')}
        </TextSubtitle>
      </Subtitle>
      <Subtitle>
        <Dot color={theme.colors.blue_500} />
        <TextSubtitle>
          {t('patient-card.calendar.appointment-others')}
        </TextSubtitle>
      </Subtitle>
    </Container>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container, PrefixText } from './styles';
import { IShowMoreProps } from './types';

export function ShowMore({
  overview,
  lastNote,
  prefixOverview,
  prefixLastNote,
}: IShowMoreProps) {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const toggleReadMore = () => setIsShowMore((show) => !show);

  const { t } = useTranslation();

  return (
    <Container>
      <p>
        <PrefixText>{prefixOverview}</PrefixText>{' '}
        {overview || `${t('patient-list.no-overview')}`}
        <br />
        <PrefixText>{prefixLastNote}</PrefixText>
        {lastNote || `${t('patient-list.no-last-note')}`}
      </p>
      <button type="button" onClick={toggleReadMore}>
        {isShowMore ? t('show.more') : t('show.less')}
      </button>
    </Container>
  );
}

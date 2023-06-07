import { useTranslation } from 'react-i18next';
import { useShowMoreText } from './hooks';
import { Container, PrefixText } from './styles';
import { IShowMoreProps } from './types';

export function ShowMore({ text, prefix }: IShowMoreProps) {
  const { t } = useTranslation();
  const { formatedText, handleShowToggle, isShowMorePossible, showMore } =
    useShowMoreText(text);

  return (
    <Container>
      <p>
        <PrefixText>{prefix}</PrefixText>{' '}
        {formatedText || `${t('patient-list.no-overview')}`}
      </p>
      {isShowMorePossible && (
        <button type="button" onClick={handleShowToggle}>
          {!showMore ? t('show.more') : t('show.less')}
        </button>
      )}
    </Container>
  );
}

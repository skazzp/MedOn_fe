import { useTranslation } from 'react-i18next';
import { useShowMoreText } from './hooks';
import { Container } from './styles';
import { IShowMoreProps } from './types';

export function ShowMore({ text, prefix }: IShowMoreProps) {
  const { t } = useTranslation();
  const { formatedText, handleShowToggle, isShowMorePossible, showMore } =
    useShowMoreText(text);

  return (
    <Container>
      <p>
        <strong>{prefix}</strong> {formatedText}
      </p>
      {isShowMorePossible && (
        <button type="button" onClick={handleShowToggle}>
          {!showMore ? t('show.more') : t('show.less')}
        </button>
      )}
    </Container>
  );
}

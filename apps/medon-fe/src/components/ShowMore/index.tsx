import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimateHeight, { Height } from 'react-animate-height';

import { Container, PrefixText } from './styles';
import { IShowMoreProps } from './types';
import { twoRowHeightPixel } from './utils/constants';

export function ShowMore({
  overview,
  lastNote,
  prefixOverview,
  prefixLastNote,
}: IShowMoreProps) {
  const [height, setHeight] = useState<Height>(twoRowHeightPixel);
  const [allHeight, setAllHeight] = useState<number>(0);
  const [isButtonShow, setIsButtonShow] = useState<boolean>(false);

  const animateHeightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animateHeightRef.current) {
      setAllHeight(animateHeightRef.current.offsetHeight);
    }
  }, [animateHeightRef]);

  useEffect(() => {
    if (allHeight > twoRowHeightPixel) {
      setHeight(twoRowHeightPixel);
      setIsButtonShow(true);
    } else {
      setIsButtonShow(false);
    }
  }, [allHeight]);

  const { t } = useTranslation();

  return (
    <Container>
      <AnimateHeight height={height}>
        <div ref={animateHeightRef}>
          <PrefixText>{prefixOverview}</PrefixText>{' '}
          {overview || `${t('patient-list.no-overview')}`}
          {prefixLastNote && (
            <>
              <br />
              <PrefixText>{prefixLastNote}</PrefixText>
              {lastNote || `${t('patient-list.no-last-note')}`}
            </>
          )}
        </div>
      </AnimateHeight>
      {isButtonShow && (
        <button
          type="button"
          onClick={() =>
            setHeight(height === twoRowHeightPixel ? 'auto' : twoRowHeightPixel)
          }
        >
          {height === twoRowHeightPixel ? t('show.more') : t('show.less')}
        </button>
      )}
    </Container>
  );
}

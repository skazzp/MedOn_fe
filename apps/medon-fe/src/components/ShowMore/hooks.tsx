import { useEffect, useState } from 'react';
import { ShowMoreTextHookReturnType } from './types';

export function useShowMoreText(
  initialText?: string,
  minChars = 300
): ShowMoreTextHookReturnType {
  const [showMore, setShowMore] = useState(false);
  const [isShowMorePossible, setIsShowMorePossible] = useState(false);

  const formatedText =
    showMore || !initialText
      ? initialText
      : `${initialText.slice(0, minChars)}...`;

  function handleShowToggle() {
    setShowMore(!showMore);
  }

  useEffect(() => {
    if (!initialText || initialText.length < minChars) {
      setIsShowMorePossible(false);
      setShowMore(true);
    } else if (initialText.length > minChars) {
      setIsShowMorePossible(true);
    }
  }, [initialText, minChars]);

  return { formatedText, showMore, handleShowToggle, isShowMorePossible };
}

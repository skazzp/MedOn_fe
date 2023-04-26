import { useState } from 'react';
import { ShowMoreTextHookReturnType } from './types';

export function useShowMoreText(
  initialText?: string,
  maxChars = 200
): ShowMoreTextHookReturnType {
  const [showMore, setShowMore] = useState(false);

  const formatedText = showMore
    ? initialText
    : `${initialText?.slice(0, maxChars)}...`;

  function handleShowToggle() {
    setShowMore(!showMore);
  }

  return { formatedText, showMore, handleShowToggle };
}

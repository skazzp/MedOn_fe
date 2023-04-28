import { useState } from 'react';

import { ShowMoreTextHookReturnType } from './types';

export function useShowMoreText(
  initialText: string | undefined,
  maxChars = 200
): ShowMoreTextHookReturnType {
  const [showMore, setShowMore] = useState(false);

  let formattedText = '';

  if (initialText)
    formattedText = showMore
      ? initialText
      : `${initialText.slice(0, maxChars)}...`;

  function handleShowToggle() {
    setShowMore(!showMore);
  }

  return { formattedText, showMore, handleShowToggle };
}

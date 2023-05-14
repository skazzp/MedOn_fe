import { useState } from 'react';

import { UseModalReturn } from './types';

export function useModal(initialValue = false): UseModalReturn {
  const [isVisible, setIsVisible] = useState(initialValue);

  function showModal() {
    setIsVisible(true);
  }

  function hideModal() {
    setIsVisible(false);
  }

  return { isVisible, showModal, hideModal };
}

import { useState } from 'react';

import { UseModalReturn } from './types';

export function useModal(initialValue: boolean): UseModalReturn {
  const [isVisible, setIsVisible] = useState<boolean>(initialValue);

  function showModal() {
    setIsVisible(true);
  }

  function hideModal() {
    setIsVisible(false);
  }

  return { isVisible, showModal, hideModal };
}

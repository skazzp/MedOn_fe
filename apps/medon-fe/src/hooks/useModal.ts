import { useState } from 'react';

interface UseModalReturn {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

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

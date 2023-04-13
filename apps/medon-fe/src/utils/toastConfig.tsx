import { ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions<object> = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'light',
};

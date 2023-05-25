import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from 'app/app';
import { persistedStore, store } from 'redux/store';
import { msgTime } from 'utils/constants/toast';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/global';
import 'assets/fonts/sf-pro-font/sf-font-face.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';
import './translation/i18next';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId={`${process.env.NX_GOOGLE_CLIENT_ID}`}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ToastContainer autoClose={msgTime} />
            <GlobalStyle />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);

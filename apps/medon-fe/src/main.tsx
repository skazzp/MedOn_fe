import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './translation/i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { theme } from 'styles/theme';
import App from 'app/app';
import { persistedStore, store } from 'redux/store';
import { GlobalStyle } from 'styles/global';
import 'assets/fonts/sf-pro-font/sf-font-face.css';
import { msgTime } from 'utils/constants/toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
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
  </StrictMode>
);

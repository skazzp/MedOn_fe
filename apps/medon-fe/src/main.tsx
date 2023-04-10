import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './translation/i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from 'redux/store';
import { GlobalStyle } from 'styles/global';
import 'assets/fonts/sf-pro-font/sf-font-face.css';
import { theme } from 'styles/theme';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

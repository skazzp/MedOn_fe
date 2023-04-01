import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './translation/i18next';
import { Provider } from 'react-redux';

import App from './app/app';
import { store } from './redux/store';
import { GlobalStyle } from './styles/global';

import 'assets/fonts/sf-pro-font/sf-font-face.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

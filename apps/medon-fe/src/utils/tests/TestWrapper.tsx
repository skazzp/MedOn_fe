import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18next from 'translation/i18next';

export const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </I18nextProvider>
    </Provider>
  </BrowserRouter>
);

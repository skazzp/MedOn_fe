import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import 'translation/i18next';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import SelectTimeSlot from './index';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  </Provider>
);

it('should render successfully', () => {
  const { baseElement } = render(<SelectTimeSlot />, {
    wrapper: Wrapper,
  });

  expect(baseElement).toBeTruthy();
});

it('should render search bar and filter', async () => {
  render(<SelectTimeSlot />, {
    wrapper: Wrapper,
  });

  expect(
    await screen.findByPlaceholderText('Find a doctor by name...')
  ).toBeTruthy();
  expect(await screen.findByText('Speciality:')).toBeTruthy();
});

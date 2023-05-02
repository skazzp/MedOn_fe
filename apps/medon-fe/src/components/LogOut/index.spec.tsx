import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import 'translation/i18next';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import LogOut from './index';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  </Provider>
);

it('should render successfully', () => {
  const { baseElement } = render(<LogOut />, {
    wrapper: Wrapper,
  });

  expect(baseElement).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
});

it('should open modal', async () => {
  render(<LogOut />, {
    wrapper: Wrapper,
  });

  fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
  expect(screen.getByText('OK')).toBeTruthy();
  expect(
    await screen.findByText('Are you sure you want to logout?')
  ).toBeTruthy();
});

it('should close modal', async () => {
  render(<LogOut />, {
    wrapper: Wrapper,
  });

  fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

  expect(screen.getByText('Cancel')).toBeTruthy();

  fireEvent.click(screen.getByText('Cancel'));

  expect(
    await screen.findByText('Are you sure you want to logout?')
  ).not.toBeVisible();
});

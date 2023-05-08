import { fireEvent, render, screen } from '@testing-library/react';
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

it('should render 24 time slots', async () => {
  render(<SelectTimeSlot />, {
    wrapper: Wrapper,
  });

  expect(await screen.findAllByText('Available Dr:')).toHaveLength(24);
});

it('click on slot should change style', async () => {
  render(<SelectTimeSlot />, {
    wrapper: Wrapper,
  });

  expect(screen.getByText('00:00 - 01:00')).toBeTruthy();

  fireEvent.click(screen.getByText('00:00 - 01:00'));

  expect(await screen.findByText('00:00 - 01:00')).toHaveStyle(
    'background-color: rgb(64, 138, 253), color: white'
  );
});

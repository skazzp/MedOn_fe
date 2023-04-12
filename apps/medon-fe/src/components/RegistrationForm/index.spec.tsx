import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import 'translation/i18next';
import { ThemeProvider } from 'styled-components';
import { ReactNode } from 'react';
import { theme } from 'styles/theme';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import RegistrationPage from 'pages/RegistrationPage/index';
import RegistrationForm from './index';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  </Provider>
);

// it('should render successfully', () => {
//   const { baseElement } = render(<RegistrationForm />, {
//     wrapper: Wrapper,
//   });

//   expect(baseElement).toBeTruthy();
// });

// it('should display required error when no value provided', async () => {
//   render(<RegistrationForm />, {
//     wrapper: Wrapper,
//   });
//   fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

//   expect(await screen.findAllByRole('alert')).toHaveLength(7);
// });

// it('should display matching error when first name is invalid', async () => {
//   render(<RegistrationForm />, {
//     wrapper: Wrapper,
//   });

//   fireEvent.input(screen.getByRole('textbox', { name: 'First Name' }), {
//     target: {
//       value: '123',
//     },
//   });

//   fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

//   expect(
//     await screen.findByText('First name must consist of only letters')
//   ).toBeTruthy();
//   expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
//     '123'
//   );
// });

// it('should display matching error when first name is invalid', async () => {
//   render(<RegistrationForm />, {
//     wrapper: Wrapper,
//   });

//   fireEvent.input(screen.getByRole('textbox', { name: /last name/i }), {
//     target: {
//       value: '123',
//     },
//   });

//   fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

//   expect(
//     await screen.findByText('Last name must consist of only letters')
//   ).toBeTruthy();
//   expect(screen.getByRole('textbox', { name: /last name/i })).toHaveValue(
//     '123'
//   );
// });

// it('should display matching error when email is invalid', async () => {
//   render(<RegistrationForm />, {
//     wrapper: Wrapper,
//   });

//   fireEvent.input(screen.getByRole('textbox', { name: 'Email' }), {
//     target: {
//       value: 'test',
//     },
//   });

//   fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

//   expect(await screen.findByText('Please enter correct email')).toBeTruthy();
//   expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('test');
// });

// it('should display error when password is too easy', async () => {
//   render(<RegistrationForm />, {
//     wrapper: Wrapper,
//   });

//   fireEvent.input(screen.getByRole('textbox', { name: /password/i }), {
//     target: {
//       value: 'password',
//     },
//   });

//   fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

//   expect(
//     await screen.findByText(
//       'At least one capital and small letter, special character and number'
//     )
//   ).toBeTruthy();
//   expect(screen.getByRole('textbox', { name: /password/i })).toHaveValue(
//     'password'
//   );
// });

// it('should display error when password is too short', async () => {
//   render(<RegistrationForm />, {
//     wrapper: Wrapper,
//   });

//   fireEvent.input(screen.getByRole('textbox', { name: /password/i }), {
//     target: {
//       value: 'Pp_1',
//     },
//   });

//   fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

//   expect(
//     await screen.findByText('Password must be at least 6 characters')
//   ).toBeTruthy();
//   expect(screen.getByRole('textbox', { name: /password/i })).toHaveValue(
//     'Pp_1'
//   );
// });

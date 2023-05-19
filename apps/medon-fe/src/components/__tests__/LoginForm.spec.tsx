import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TestWrapper } from 'utils/tests/TestWrapper';

import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  test('renders email and password inputs', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders error message for invalid email input', async () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.submit(screen.getByRole('button'));

    const emailErrorMessage = await screen.findByText(/E-mail is required/i);

    expect(emailErrorMessage).toBeInTheDocument();

    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.submit(screen.getByRole('button'));

    const invalidEmailErrorMessage = await screen.findByText(
      /email must be a valid email/i
    );

    expect(invalidEmailErrorMessage).toBeInTheDocument();
  });

  test('renders error message for invalid password input', async () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.submit(screen.getByRole('button'));

    const passwordErrorMessage = await screen.findByText(
      /Password must be at least 6 characters long/i
    );

    expect(passwordErrorMessage).toBeInTheDocument();

    await userEvent.type(passwordInput, 'invalid-password');
    fireEvent.submit(screen.getByRole('button'));

    const invalidPasswordErrorMessage = await screen.findByText(
      /Password must include at least one capital letter, one small letter, one special character and one number/i
    );

    expect(invalidPasswordErrorMessage).toBeInTheDocument();
  });
});

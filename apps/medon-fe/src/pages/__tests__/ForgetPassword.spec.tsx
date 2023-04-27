import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TestWrapper } from 'utils/tests/TestWrapper';

import ForgetPassword from '../ForgetPassword';

describe('ForgetPassword', () => {
  beforeEach(() => {
    render(
      <TestWrapper>
        <ForgetPassword />
      </TestWrapper>
    );
  });

  it('should render the form with email input and send email button', () => {
    const emailInput = screen.getByPlaceholderText(/Email Address */i);
    const sendEmailButton = screen.getByRole('button', {
      name: /NEXT/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(sendEmailButton).toBeInTheDocument();
  });

  it('should show error message when an invalid email is entered', async () => {
    const emailInput = screen.getByPlaceholderText(/Email Address */i);
    const sendEmailButton = screen.getByRole('button', {
      name: /NEXT/i,
    });

    userEvent.type(emailInput, 'invalid-email');
    fireEvent.click(sendEmailButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Email is required/i);

      expect(errorMessage).toBeInTheDocument();
    });
  });
});

import { render, fireEvent, waitFor } from '@testing-library/react';
import { TestWrapper } from 'utils/tests/TestWrapper';

import UpdatePassword from 'pages/UpdatePassword';

describe('UpdatePassword component', () => {
  it('renders the form elements', () => {
    const { getByPlaceholderText, getByText } = render(
      <TestWrapper>
        <UpdatePassword />
      </TestWrapper>
    );

    expect(getByPlaceholderText(/Current Password */i)).toBeInTheDocument();
    expect(getByPlaceholderText('New Password *')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm New Password *')).toBeInTheDocument();
    expect(getByText(/RESET/i)).toBeInTheDocument();
  });

  it('shows an error message when password is less than 6 characters', async () => {
    const { getByPlaceholderText, getByText } = render(
      <TestWrapper>
        <UpdatePassword />
      </TestWrapper>
    );

    const oldPasswordInput = getByPlaceholderText(/Current Password */i);
    const newPasswordInput = getByPlaceholderText('New Password *');
    const confirmNewPasswordInput = getByPlaceholderText(
      'Confirm New Password *'
    );
    const submitButton = getByText(/RESET/i);

    fireEvent.change(oldPasswordInput, { target: { value: 'oldpassword' } });
    fireEvent.change(newPasswordInput, { target: { value: 'weak' } });
    fireEvent.change(confirmNewPasswordInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText(/Password must be at least 6 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('shows an error message when password is longer than 20 characters', async () => {
    const { getByPlaceholderText, getByText } = render(
      <TestWrapper>
        <UpdatePassword />
      </TestWrapper>
    );

    const oldPasswordInput = getByPlaceholderText(/Current Password */i);
    const newPasswordInput = getByPlaceholderText('New Password *');
    const confirmNewPasswordInput = getByPlaceholderText(
      'Confirm New Password *'
    );
    const submitButton = getByText(/RESET/i);

    fireEvent.change(oldPasswordInput, { target: { value: 'oldpassword' } });
    fireEvent.change(newPasswordInput, {
      target: { value: 'thispasswordislongerthan20characters' },
    });
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: 'thispasswordislongerthan20characters' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText(/Password must be 20 characters maximum/i)
      ).toBeInTheDocument();
    });
  });

  it('shows an error message when newPassword is equal to oldPassword', async () => {
    const { getByPlaceholderText, getByText } = render(
      <TestWrapper>
        <UpdatePassword />
      </TestWrapper>
    );

    const oldPasswordInput = getByPlaceholderText(/Current Password */i);
    const newPasswordInput = getByPlaceholderText('New Password *');
    const confirmNewPasswordInput = getByPlaceholderText(
      'Confirm New Password *'
    );
    const submitButton = getByText(/RESET/i);

    fireEvent.change(oldPasswordInput, { target: { value: 'oldpassword' } });
    fireEvent.change(newPasswordInput, { target: { value: 'oldpassword' } });
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: 'oldpassword' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText(/Current password and new password can't be the same/i)
      ).toBeInTheDocument();
    });
  });
});

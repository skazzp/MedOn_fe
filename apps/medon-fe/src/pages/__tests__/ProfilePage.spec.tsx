import { render, screen } from '@testing-library/react';

import ProfilePage from 'pages/ProfilePage';

import { TestWrapper } from 'utils/tests/TestWrapper';

describe('ProfilePage component', () => {
  it('renders profile form', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const birthdayInput = screen.getByLabelText(/Birth Date/i);
    const roleInput = screen.getByLabelText(/Role/i);
    const countryInput = screen.getByLabelText(/Country/i);
    const cityInput = screen.getByLabelText(/City/i);
    const timezoneInput = screen.getByLabelText(/Time zone/i);

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(birthdayInput).toBeInTheDocument();
    expect(roleInput).toBeInTheDocument();
    expect(countryInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(timezoneInput).toBeInTheDocument();
  });
});

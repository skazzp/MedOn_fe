import { render, screen } from '@testing-library/react';

import { TestWrapper } from 'utils/tests/TestWrapper';

import AppointmentsScore from '../AppointmentsScore';

describe('AppointmentsScore', () => {
  test('renders patient count', () => {
    render(
      <TestWrapper>
        <AppointmentsScore quantity={6} />
      </TestWrapper>
    );
    const patientCount = screen.getByTestId(/patient-count/i);

    expect(patientCount).toBeInTheDocument();
  });

  test('renders latest appointments heading', () => {
    render(
      <TestWrapper>
        <AppointmentsScore quantity={6} />
      </TestWrapper>
    );
    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent(/Latest Appointments/i);
  });

  test('renders manage availability link when remote', () => {
    render(
      <TestWrapper>
        <AppointmentsScore quantity={6} />
      </TestWrapper>
    );
    const manageLink = screen.getByText(/Latest Appointments/i);

    expect(manageLink).toBeInTheDocument();
  });

  test('does not render radio buttons when not remote', () => {
    render(
      <TestWrapper>
        <AppointmentsScore quantity={6} />
      </TestWrapper>
    );
    const listRadio = screen.queryByLabelText(/List/i);
    const monthRadio = screen.queryByLabelText(/Month/i);

    expect(listRadio).toBeNull();
    expect(monthRadio).toBeNull();
  });

  test('renders correct patient count when not remote', () => {
    const patientCount = '6';

    render(
      <TestWrapper>
        <AppointmentsScore quantity={6} />
      </TestWrapper>
    );

    expect(screen.getByTestId(/patient-count/i)).toHaveTextContent(
      patientCount.toString()
    );
  });
});

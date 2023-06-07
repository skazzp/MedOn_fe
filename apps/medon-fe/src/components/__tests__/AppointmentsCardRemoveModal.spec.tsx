import { fireEvent, render, screen } from '@testing-library/react';

import { RemoteAppointmentModal } from 'components/AppointmentsCardRemoveModal';

import { TestWrapper } from 'utils/tests/TestWrapper';

describe('RemoteAppointmentModal', () => {
  const defaultProps = {
    id: '1',
    hideRemoveModal: jest.fn(),
    showRemoveModal: jest.fn(),
    isRemoveVisible: true,
  };

  it('should render the modal with the correct title and message', () => {
    render(
      <TestWrapper>
        <RemoteAppointmentModal {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByText(/Remove Appointment/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to remove this appointment?/i)
    ).toBeInTheDocument();
  });

  it('calls hideAddModal when cancel button is clicked', () => {
    render(
      <TestWrapper>
        <RemoteAppointmentModal {...defaultProps} />
      </TestWrapper>
    );
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(defaultProps.hideRemoveModal).toHaveBeenCalled();
  });
});

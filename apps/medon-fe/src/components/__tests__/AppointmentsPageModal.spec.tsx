import { render, screen } from '@testing-library/react';
import { AppointmentsPageModal } from 'components/AppointmentsPageModal';
import { TestWrapper } from 'utils/tests/TestWrapper';

describe('AppointmentsPageModal', () => {
  const selectedEvent = {
    title: 'Test Appointment',
    resource: {
      patient: 'Test Patient',
      localDoctor: 'Test Local Doctor',
      remoteDoctor: 'Test Remote Doctor',
    },
    start: new Date('2022-02-22T10:00:00Z'),
  };

  it('renders the title', () => {
    render(
      <TestWrapper>
        <AppointmentsPageModal
          selectedEvent={selectedEvent}
          isVisible={true}
          hideModal={() => {}}
        />
      </TestWrapper>
    );
    const titleElement = screen.getByText('Test Appointment');

    expect(titleElement).toBeInTheDocument();
  });

  it('renders the patient name', () => {
    render(
      <TestWrapper>
        <AppointmentsPageModal
          selectedEvent={selectedEvent}
          isVisible={true}
          hideModal={() => {}}
        />
      </TestWrapper>
    );
    const patientNameElement = screen.getByText('Test Patient');

    expect(patientNameElement).toBeInTheDocument();
  });
});

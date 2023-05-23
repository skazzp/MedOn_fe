import { render, fireEvent } from '@testing-library/react';

import { IAppointmentsCardProps } from 'components/AppointmentsCard/types';
import { TestWrapper } from 'utils/tests/TestWrapper';

import { AppointmentsCard } from '../AppointmentsCard';

describe('AppointmentsCard', () => {
  const mockProps: IAppointmentsCardProps = {
    id: 1,
    link: 'http://example.com',
    startTime: new Date('2022-01-01T09:00:00.000Z'),
    endTime: new Date('2022-01-01T10:00:00.000Z'),
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      dateOfBirth: new Date('1980-01-01'),
      overview: 'Example overview text',
    },
    isLinkAdded: true,
    remoteDoctor: { lastName: 'Smith' },
    role: 'local',
  };

  it('renders the appointment ID and patient name', () => {
    const { getByText } = render(
      <TestWrapper>
        <AppointmentsCard {...mockProps} />
      </TestWrapper>
    );

    expect(getByText(/# 1/i)).toBeInTheDocument();
    expect(getByText('J Doe')).toBeInTheDocument();
  });

  it('renders the add link button if the link has been added', () => {
    const { getByText } = render(
      <TestWrapper>
        <AppointmentsCard {...mockProps} />
      </TestWrapper>
    );

    expect(getByText(/Add Link/i)).toBeInTheDocument();
  });

  it('opens the modal when the add link button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <AppointmentsCard {...mockProps} />
      </TestWrapper>
    );

    fireEvent.click(getByText(/Add Link/i));
    expect(
      getByPlaceholderText(/Add link to zoom meeting/i)
    ).toBeInTheDocument();
  });
});

import { render } from '@testing-library/react';
import { TestWrapper } from 'utils/tests/TestWrapper';
import PatientCardNotes from '../PatientCardNotes';

describe('PatientCardNotes component', () => {
  const props = {
    date: '2022-01-01',
    time: '10:00',
    note: 'This is a test note',
    doctor: {
      lastName: 'Doe',
    },
  };

  it('renders date and time', () => {
    const { getByText } = render(
      <TestWrapper>
        <PatientCardNotes {...props} />
      </TestWrapper>
    );

    expect(getByText(/2022-01-01/i)).toBeInTheDocument();
    expect(getByText('10:00')).toBeInTheDocument();
  });

  it('renders note', () => {
    const { getByText } = render(
      <TestWrapper>
        <PatientCardNotes {...props} />
      </TestWrapper>
    );

    expect(getByText('This is a test note')).toBeInTheDocument();
  });

  it('renders doctor', () => {
    const { getByText } = render(
      <TestWrapper>
        <PatientCardNotes {...props} />
      </TestWrapper>
    );

    expect(getByText('Dr. Doe')).toBeInTheDocument();
  });
});

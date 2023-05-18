import { render, screen } from '@testing-library/react';

import { TestWrapper } from 'utils/tests/TestWrapper';

import { PatientCardCalendar } from '../PatientCardCalendar';

describe('PatientCardCalendar', () => {
  it('renders the title', () => {
    render(
      <TestWrapper>
        <PatientCardCalendar />
      </TestWrapper>
    );

    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  it('does not render the add event button for non-local roles', () => {
    render(
      <TestWrapper>
        <PatientCardCalendar />
      </TestWrapper>
    );

    expect(screen.queryByText('Add event')).not.toBeInTheDocument();
  });
});

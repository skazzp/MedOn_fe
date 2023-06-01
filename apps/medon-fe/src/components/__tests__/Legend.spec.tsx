import { render } from '@testing-library/react';
import { Legend } from 'components/Legend';
import { TestWrapper } from 'utils/tests/TestWrapper';

describe('Legend component', () => {
  it('should render the legend title', () => {
    const { getByText } = render(
      <TestWrapper>
        <Legend />
      </TestWrapper>
    );
    const legendTitle = getByText(/Legend:/i);

    expect(legendTitle).toBeInTheDocument();
  });

  it('should render the "appointment you" subtitle', () => {
    const { getByText } = render(
      <TestWrapper>
        <Legend />
      </TestWrapper>
    );
    const appointmentYouSubtitle = getByText(/Appointments with you/i);

    expect(appointmentYouSubtitle).toBeInTheDocument();
  });

  it('should render the "appointment others" subtitle', () => {
    const { getByText } = render(
      <TestWrapper>
        <Legend />
      </TestWrapper>
    );
    const appointmentOthersSubtitle = getByText(
      /Appointments with other doctors/i
    );

    expect(appointmentOthersSubtitle).toBeInTheDocument();
  });
});

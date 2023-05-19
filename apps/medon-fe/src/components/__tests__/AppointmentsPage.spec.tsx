import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AppointmentsPage from 'pages/AppointmentsPage';
import { TestWrapper } from 'utils/tests/TestWrapper';

describe('AppointmentsPage', () => {
  it('should render AppointmentsList by default', () => {
    const { getByText } = render(
      <TestWrapper>
        <AppointmentsPage />
      </TestWrapper>
    );
    const element = getByText('Full list');
    expect(element).toBeInTheDocument();
  });

  it('should render Calendar when month view is clicked', () => {
    const { getByText } = render(
      <TestWrapper>
        <AppointmentsPage />
      </TestWrapper>
    );

    fireEvent.click(getByText('Month'));

    const expectedTexts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    expectedTexts.forEach((text) => {
      const element = getByText(text);
      expect(element).toBeInTheDocument();
    });
  });
});

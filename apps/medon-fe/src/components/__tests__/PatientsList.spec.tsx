import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestWrapper } from 'utils/tests/TestWrapper';
import PatientsList from '../PatientsList/index';

test('renders patients list component correctly', () => {
  render(
    <TestWrapper>
      <PatientsList />
    </TestWrapper>
  );

  const headingElement = screen.getByText('Choose Patient');

  expect(headingElement).toBeInTheDocument();

  const inputSearchElement = screen.getByPlaceholderText(/Search/i);

  expect(inputSearchElement).toBeInTheDocument();
});

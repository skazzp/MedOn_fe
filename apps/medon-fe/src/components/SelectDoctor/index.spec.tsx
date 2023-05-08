import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'translation/i18next';
import { TestWrapper } from 'utils/tests/TestWrapper';
import SelectTimeSlot from './index';

it('should render successfully', () => {
  const { baseElement } = render(<SelectTimeSlot />, {
    wrapper: TestWrapper,
  });

  expect(baseElement).toBeTruthy();
});

it('should render search bar and filter', async () => {
  render(<SelectTimeSlot />, {
    wrapper: TestWrapper,
  });

  expect(
    await screen.findByPlaceholderText('Find a doctor by name...')
  ).toBeTruthy();
  expect(await screen.findByText('Speciality:')).toBeTruthy();
});

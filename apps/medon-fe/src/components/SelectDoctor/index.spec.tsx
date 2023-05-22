import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'translation/i18next';
import { TestWrapper } from 'utils/tests/TestWrapper';
import SelectDoctor from './index';

it('should render successfully', () => {
  const { baseElement } = render(
    <SelectDoctor
      selectDoctorAppointments={() => {}}
      selectedDoctor={2}
      isActiveDoc={1}
      setIsActiveDoc={() => {}}
    />,
    {
      wrapper: TestWrapper,
    }
  );

  expect(baseElement).toBeTruthy();
});

it('should render search bar and filter', async () => {
  render(
    <SelectDoctor
      selectDoctorAppointments={() => {}}
      selectedDoctor={2}
      isActiveDoc={1}
      setIsActiveDoc={() => {}}
    />,
    {
      wrapper: TestWrapper,
    }
  );

  expect(
    await screen.findByPlaceholderText('Find a doctor by name...')
  ).toBeTruthy();
  expect(await screen.findByText('Speciality:')).toBeTruthy();
});

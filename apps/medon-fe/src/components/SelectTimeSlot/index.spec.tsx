import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestWrapper } from 'utils/tests/TestWrapper';
import SelectTimeSlot from './index';

it('should render successfully', () => {
  const { baseElement } = render(
    <SelectTimeSlot
      selectedTime={'00:00 - 01:00'}
      selectTimeAppointments={() => {}}
      isActive={' '}
      setIsActive={() => {}}
      data={[]}
      setSelectedDoctorsById={() => {}}
      setEndTime={() => {}}
      setStartTime={() => {}}
      selectedDate={null}
    />,
    {
      wrapper: TestWrapper,
    }
  );

  expect(baseElement).toBeTruthy();
});

it('should render 24 time slots', async () => {
  render(
    <SelectTimeSlot
      selectedTime={'00:00 - 01:00'}
      selectTimeAppointments={() => {}}
      isActive={' '}
      setIsActive={() => {}}
      data={[]}
      setSelectedDoctorsById={() => {}}
      setEndTime={() => {}}
      setStartTime={() => {}}
      selectedDate={null}
    />,
    {
      wrapper: TestWrapper,
    }
  );

  expect(await screen.findAllByText('Available Dr:')).toHaveLength(24);
});

it('click on slot should change style', async () => {
  render(
    <SelectTimeSlot
      selectedTime={'00:00 - 01:00'}
      selectTimeAppointments={() => {}}
      isActive={' '}
      setIsActive={() => {}}
      data={[]}
      setSelectedDoctorsById={() => {}}
      setEndTime={() => {}}
      setStartTime={() => {}}
      selectedDate={null}
    />,
    {
      wrapper: TestWrapper,
    }
  );

  expect(screen.getByText('00:00 - 01:00')).toBeTruthy();

  fireEvent.click(screen.getByText('00:00 - 01:00'));

  expect(await screen.findByText('00:00 - 01:00')).toHaveStyle(
    'background-color: rgb(64, 138, 253), color: white'
  );
});

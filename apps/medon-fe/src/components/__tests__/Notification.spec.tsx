import { render, screen } from '@testing-library/react';
import { Notification } from 'components/Notification';
import { NotificationType, TimerType } from 'components/Notification/types';
import { Gender } from 'utils/constants';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn(),
  }),
}));

const mockPatient = {
  id: 123,
  firstName: 'Capitan',
  lastName: 'Ill',
  email: 'patient@gmail.com',
  gender: Gender.Male,
  dateOfBirth: new Date(),
  country: 'Ukraine',
  city: 'Dnepr',
  phoneNumber: '+380992132736',
  overview: 'test overview',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockLocalDoctor = {
  firstName: 'Adam',
  lastName: 'Smith',
  email: 'doctor@gmail.com',
  role: 'local',
  specialityId: null,
  photo: '',
  dateOfBirth: new Date(),
  isVerified: true,
  country: null,
  city: 'Ukraine',
  timeZone: null,
  id: 2,
};

const mockRemoteDoctor = {
  firstName: 'John',
  lastName: 'Brown',
  email: 'doctor1@gmail.com',
  role: 'remote',
  specialityId: 1,
  photo: '',
  dateOfBirth: new Date(),
  isVerified: true,
  country: null,
  city: 'Ukraine',
  timeZone: null,
  id: 2,
};

const mockAppointment = {
  startTime: new Date(new Date().getTime() - 10 * 60000),
  endTime: new Date(new Date().getTime() + 50 * 60000),
  patientId: 123,
  patient: mockPatient,
  localDoctorId: 1,
  localDoctor: mockLocalDoctor,
  remoteDoctorId: 2,
  remoteDoctor: mockRemoteDoctor,
};

describe('Notification', () => {
  test('renders notification with details button', () => {
    const { container } = render(
      <Notification
        user={mockLocalDoctor}
        appointment={mockAppointment}
        timerType={TimerType.Counter}
        renderTitle={(timer) => `Time remaining: ${timer}`}
        type={NotificationType.Current}
      />
    );

    // Check if the notification component is rendered
    expect(container.firstChild).toBeInTheDocument();

    // Check if the title is rendered correctly
    const titleElement = screen.getByText(/Time remaining:/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the patient and doctor names are rendered correctly
    const patientElement = screen.getByText(/Capitan Ill/i);
    expect(patientElement).toBeInTheDocument();
    const doctorElement = screen.getByText(/Brown/i);
    expect(doctorElement).toBeInTheDocument();

    // Check if the details button is rendered
    const detailsButton = screen.getByRole('button');
    expect(detailsButton).toBeInTheDocument();
  });
});

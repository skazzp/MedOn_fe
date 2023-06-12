import dayjs from 'dayjs';
import { Event } from 'react-big-calendar';
import { useGetAppointmentsByPatientsIdQuery } from 'redux/api/appointmentsApi';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';
import { timeFormat } from 'utils/constants';

const emptyArray: Event[] = [];

const useGetPatientAppointments = (id: string) => {
  const user = useAppSelector(getUserSelector);

  const { appointments } = useGetAppointmentsByPatientsIdQuery(id, {
    skip: !id,
    selectFromResult: ({ data }) => ({
      appointments:
        data && data.data
          ? data.data.map((elem) => ({
              title: `${dayjs(elem.startTime).format(timeFormat)} - ${dayjs(
                elem.endTime
              ).format(timeFormat)}`,
              start: dayjs(elem.startTime),
              end: dayjs(elem.endTime),
              allDay: true,
              resource: {
                link: elem.link,
                isColor:
                  elem.localDoctorId === user.id ||
                  elem.remoteDoctorId === user.id,
                localDoctor: `${elem.localDoctor?.firstName} ${elem.localDoctor?.lastName}`,
                remoteDoctor: `${elem.remoteDoctor?.firstName} ${elem.remoteDoctor?.lastName}`,
              },
            }))
          : emptyArray,
    }),
  });

  return appointments;
};

export default useGetPatientAppointments;

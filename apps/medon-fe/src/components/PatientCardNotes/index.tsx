import { useTranslation } from 'react-i18next';
import { ShowMore } from 'components/ShowMore';
import { Container, Date, Time, Overview, Doctor, Top } from './styles';
import { IPatientCardNotes } from './types';

export default function PatientCardNotes({
  date,
  time,
  note,
  doctor,
}: IPatientCardNotes) {
  const { t } = useTranslation();

  return (
    <Container>
      <Top>
        <Date>{date} &bull;</Date>
        <Time>{time}</Time>
      </Top>
      <Overview>
        <ShowMore text={note} />
      </Overview>
      <Doctor>
        {t('patient-card.notes.prefix-doctor')} {doctor.lastName}
      </Doctor>
    </Container>
  );
}

import { useTranslation } from 'react-i18next';
import { useShowMoreText } from '../PatientCard/hooks';
import { Container, Date, Time, Overview, Doctor, Top } from './styles';
import { IPatientCardNotes } from './types';

export default function PatientCardNotes({
  date,
  time,
  note,
  doctor,
}: IPatientCardNotes) {
  const { formatedText, handleShowToggle, showMore, isShowMorePossible } =
    useShowMoreText(note);

  const { t } = useTranslation();

  return (
    <Container>
      <Top>
        <Date>{date} &bull;</Date>
        <Time>{time}</Time>
      </Top>
      <Overview>
        {formatedText}
        {isShowMorePossible && (
          <button onClick={handleShowToggle}>
            {!showMore ? t('show.more') : t('show.less')}
          </button>
        )}
      </Overview>
      <Doctor>
        {t('patient-card.notes.prefix-doctor')} {doctor.lastName}
      </Doctor>
    </Container>
  );
}

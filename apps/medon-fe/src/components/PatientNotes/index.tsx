import { Pagination, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import PatientCardNotes from 'components/PatientCardNotes';
import { PatientNote } from 'interfaces/patients';
import { formatDate, formatTime } from 'utils/functions';
import { IPatientNotesProps } from './types';

export function PatientNotes({
  notes,
  isFetching,
  page,
  limit,
  setPage,
  setLimit,
  total,
}: IPatientNotesProps) {
  const { t } = useTranslation();

  if (isFetching) {
    return <Skeleton active />;
  }

  if (!notes?.length) {
    return <span>{t('patient-card.notes.empty-notes')}</span>;
  }

  return (
    <>
      {notes.map((note: PatientNote) => (
        <PatientCardNotes
          key={note.id}
          note={note.note}
          date={formatDate(note.createdAt)}
          time={formatTime(note.createdAt)}
          doctor={note.doctor}
        />
      ))}
      <Pagination
        total={total}
        current={page}
        pageSize={limit}
        defaultCurrent={1}
        onChange={(pageValue, pageSize) => {
          setPage(pageValue);
          setLimit(pageSize);
        }}
        showSizeChanger={true}
      />
    </>
  );
}

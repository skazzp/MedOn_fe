import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShowMore } from 'components/ShowMore';
import TextArea from 'antd/es/input/TextArea';
import {
  useGetPatientNotesQuery,
  useUpdatePatientNoteMutation,
} from 'redux/api/patientApi';
import { useParams } from 'react-router-dom';
import { Edit } from 'assets/svgs/patientCard';
import { toast } from 'react-toastify';
import {
  Container,
  Date,
  Time,
  Overview,
  Doctor,
  Top,
  EditButton,
  BlocksButton,
  RowButton,
} from './styles';
import { IPatientCardNotes, IPatientNote } from './types';

export default function PatientCardNotes({
  date,
  time,
  note,
  doctor,
}: IPatientCardNotes) {
  const { t } = useTranslation();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editedNote, setEditedNote] = useState(note);
  const patientNotesQuery = useGetPatientNotesQuery({ id });
  const patientNotes = patientNotesQuery.data?.data?.notes as
    | IPatientNote[]
    | undefined;

  const selectedNote = patientNotes?.find((n) => n.note === note);

  const [updatePatientNote] = useUpdatePatientNoteMutation();

  const handleEdit = () => {
    setEditMode(true);
    setEditedNote(note);
  };

  const handleSave = async () => {
    try {
      await updatePatientNote({
        patientId: id as unknown as number,
        noteId: selectedNote?.id || 0,
        updatedNote: editedNote,
      });
      setEditMode(false);
      toast.success(t('patient-card.note.save-success'));
    } catch (error) {
      toast.error(t('patient-card.note.error'));
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedNote(note);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedNote(event.target.value);
  };

  return (
    <Container>
      <Top>
        <Date>{date} &bull;</Date>
        <Time>{time}</Time>
      </Top>
      <Overview>
        {editMode ? (
          <TextArea value={editedNote} onChange={handleNoteChange} />
        ) : (
          <ShowMore text={editedNote} prefix={`${t('show.prefix.note')}`} />
        )}
        <BlocksButton>
          {editMode ? (
            <RowButton>
              <EditButton onClick={handleSave}>
                {t('patient-card.buttons.save')}
              </EditButton>
              <EditButton onClick={handleCancel}>
                {t('patient-card.buttons.cancel')}
              </EditButton>
            </RowButton>
          ) : (
            <EditButton onClick={handleEdit}>
              {t('patient-card.buttons.edit')}
              <Edit />
            </EditButton>
          )}
        </BlocksButton>
      </Overview>
      <Doctor>
        {t('patient-card.notes.prefix-doctor')} {doctor.lastName}
      </Doctor>
    </Container>
  );
}

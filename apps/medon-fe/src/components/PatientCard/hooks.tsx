import { useCallback, useEffect, useState } from 'react';
import { Patient, PatientNote, patientNotes } from 'utils/mock/patientNote';
import { FormattedPatientNote, ShowMoreTextHookReturnType } from './types';

export function useShowMoreText(
  initialText: string,
  maxChars = 200
): ShowMoreTextHookReturnType {
  const [showMore, setShowMore] = useState(false);

  const formatedText = showMore
    ? initialText
    : `${initialText.slice(0, maxChars)}...`;

  function handleShowToggle() {
    setShowMore(!showMore);
  }

  return { formatedText, showMore, handleShowToggle };
}

export function useFormatData(patient: Patient) {
  const { firstName, lastName, gender } = patient;
  const formattedName = `${firstName} ${lastName}`;
  const formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  const birthdate = new Date(patient.dateOfBirth);
  const ageDiffMs = Date.now() - birthdate.getTime();
  const ageDate = new Date(ageDiffMs);
  const formattedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  return { formattedName, formattedGender, formattedAge };
}

export const useFormatNotesData = (): {
  formattedNotes: FormattedPatientNote[];
} => {
  const [formattedNotes, setFormattedNotes] = useState<FormattedPatientNote[]>(
    []
  );

  const formatDate = (dateTimeStr: string): string => {
    const dateTime = new Date(dateTimeStr);
    const month = dateTime.toLocaleString('default', { month: 'short' });
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const formatTime = (dateTimeStr: string): string => {
    const dateTime = new Date(dateTimeStr);
    const hour = dateTime.toLocaleString('default', {
      hour: 'numeric',
      hour12: false,
    });
    const minute = dateTime.getMinutes().toString().padStart(2, '0');

    return `${hour}:${minute}`;
  };

  const formatNotesCallback = useCallback(
    (notes: PatientNote[]) => {
      const formatted = notes.map((note) => ({
        ...note,
        formattedDate: formatDate(note.createdAt),
        formattedTime: formatTime(note.createdAt),
      }));

      setFormattedNotes(formatted);
    },
    [setFormattedNotes]
  );

  // Format notes on mount
  useEffect(() => {
    formatNotesCallback(patientNotes);
  }, [formatNotesCallback]);

  return { formattedNotes };
};

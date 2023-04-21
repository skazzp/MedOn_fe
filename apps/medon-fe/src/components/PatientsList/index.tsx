import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';

export function PatientsList() {
  const navigate = useNavigate();
  // TODO: MED-73
  return (
    <div>
      <h1>Patients List</h1>
      <Button onClick={() => navigate('/patients/add-new')}>
        Add new patient
      </Button>
    </div>
  );
}

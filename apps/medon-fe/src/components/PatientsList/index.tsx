import React from 'react';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

export function PatientsList() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Patients List</h1>
      <Button onClick={() => navigate('/patients/add-new')}>
        Add new patient
      </Button>
    </div>
  );
}

import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const accesToken = localStorage.getItem('token') as string;
  return <>{accesToken ? <div>Profile-test</div> : <Navigate to={'/'} />}</>;
}

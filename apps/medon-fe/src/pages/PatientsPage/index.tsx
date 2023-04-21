import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from 'components/Navigation';
import { Wrapper, Container } from 'pages/PatientsPage/styles';

export function PatientsPage() {
  return (
    <Wrapper>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
}

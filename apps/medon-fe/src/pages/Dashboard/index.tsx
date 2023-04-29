import React from 'react';
import { Outlet } from 'react-router-dom';
import { Wrapper, Container } from 'pages/Dashboard/styles';

export function DashboardPage() {
  return (
    <Wrapper>
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
}

import { Outlet } from 'react-router-dom';
import { Wrapper, Container } from 'pages/PatientsPage/styles';

export function PatientsPage() {
  return (
    <Wrapper>
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
}

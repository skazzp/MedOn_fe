import Navigation from 'components/Navigation';
import ProfilePage from 'pages/ProfilePage';
import Container from './styles';

export default function Layout() {
  return (
    <Container>
      <Navigation />
      <ProfilePage />
    </Container>
  );
}

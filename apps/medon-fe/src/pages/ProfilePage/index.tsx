import ProfileForm from 'components/ProfileForm';
import { Container, ProfileImage } from './styles';

export default function ProfilePage() {
  return (
    <Container>
      <ProfileImage />
      <ProfileForm />
    </Container>
  );
}

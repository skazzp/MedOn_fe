import ProfileForm from 'components/ProfileForm';
import Sidebar from 'components/Sidebar';

import {
  Container,
  FormContainer,
  ProfileImage,
  SidebarContainer,
} from './styles';

export default function ProfilePage() {
  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <FormContainer>
        <ProfileImage />
        <ProfileForm />
      </FormContainer>
    </Container>
  );
}

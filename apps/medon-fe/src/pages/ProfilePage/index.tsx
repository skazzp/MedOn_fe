import ProfileForm from 'components/ProfileForm';
import Sidebar from 'components/Sidebar';

import { FormContainer, ProfileImage, SidebarContainer } from './styles';

export default function ProfilePage() {
  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <FormContainer>
        <ProfileImage />
        <ProfileForm />
      </FormContainer>
    </>
  );
}

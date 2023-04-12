import ProfileForm from 'components/ProfileForm';
import Sidebar from 'components/Sidebar';

import { AppContainer, ContentContainer, ProfileFormWrapper } from './styles';

export default function ProfilePage() {
  return (
    <AppContainer>
      <ContentContainer>
        <Sidebar />
        <ProfileFormWrapper>
          <ProfileForm />
        </ProfileFormWrapper>
      </ContentContainer>
    </AppContainer>
  );
}

import ProfileForm from 'components/ProfileForm';
import Sidebar from 'components/Sidebar';

import {
  ProfilePageContainer,
  ContentContainer,
  ProfileFormWrapper,
} from './styles';

export default function ProfilePage() {
  return (
    <ProfilePageContainer>
      <ContentContainer>
        <Sidebar />
        <ProfileFormWrapper>
          <ProfileForm />
        </ProfileFormWrapper>
      </ContentContainer>
    </ProfilePageContainer>
  );
}

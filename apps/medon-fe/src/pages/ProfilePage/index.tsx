import ProfileForm from 'components/ProfileForm';

import {
  ProfilePageContainer,
  ContentContainer,
  ProfileFormWrapper,
} from './styles';

export default function ProfilePage() {
  return (
    <ProfilePageContainer>
      <ContentContainer>
        <ProfileFormWrapper>
          <ProfileForm />
        </ProfileFormWrapper>
      </ContentContainer>
    </ProfilePageContainer>
  );
}

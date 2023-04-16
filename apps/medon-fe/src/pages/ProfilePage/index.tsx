import ProfileForm from 'components/ProfileForm';
// import Navigation from 'components/Navigation';
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

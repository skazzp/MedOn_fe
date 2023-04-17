import ProfileForm from 'components/ProfileForm';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { getIsVerifiedSelector } from 'redux/features/userSlice/userSelectors';
import {
  ProfilePageContainer,
  ContentContainer,
  ProfileFormWrapper,
} from './styles';

export default function ProfilePage() {
  const isVerified = useAppSelector(getIsVerifiedSelector);
  return (
    <ProfilePageContainer>
      {isVerified ? (
        <ContentContainer>
          <ProfileFormWrapper>
            <ProfileForm />
          </ProfileFormWrapper>
        </ContentContainer>
      ) : (
        <Navigate to={'/re-confirm-account'} />
      )}
    </ProfilePageContainer>
  );
}

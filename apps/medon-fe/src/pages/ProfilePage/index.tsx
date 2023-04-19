import ProfileForm from 'components/ProfileForm';
import { useUpdateUserMutation } from 'redux/api/userApi';
import { FormProfileData } from 'components/ProfileForm/types';
import { ROLES } from 'utils/constants/roles';
import { toast } from 'react-toastify';
import { toastConfig } from 'utils/toastConfig';
import dayjs from 'dayjs';
import {
  ProfilePageContainer,
  ContentContainer,
  ProfileFormWrapper,
} from './styles';

export default function ProfilePage() {
  const [updateUser] = useUpdateUserMutation();

  const submitForm = async (values: FormProfileData) => {
    const requestData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      dateOfBirth: dayjs(values.birthday).format('YYYY-MM-DD'),
      role: values.role,
      specialityId:
        values.role === ROLES.REMOTE && values.speciality
          ? +values.speciality
          : null,
      country: values.country,
      city: values.city,
      timeZone: values.timezone,
    };
    try {
      await updateUser(requestData).unwrap();
    } catch (err) {
      toast.error('Registration error, try again!', toastConfig);
    }
  };
  return (
    <ProfilePageContainer>
      <ContentContainer>
        <ProfileFormWrapper>
          <ProfileForm submitForm={submitForm} />
        </ProfileFormWrapper>
      </ContentContainer>
    </ProfilePageContainer>
  );
}

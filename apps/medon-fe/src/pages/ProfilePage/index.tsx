import ProfileForm from 'components/ProfileForm';
import { useGetUserQuery, useUpdateUserMutation } from 'redux/api/userApi';
import { FormProfileData } from 'components/ProfileForm/types';
import { ROLES } from 'utils/constants/roles';
import { toast } from 'react-toastify';
import { toastConfig } from 'utils/toastConfig';
import dayjs from 'dayjs';
import { Spin } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setUser } from 'redux/features/userSlice/userSlice';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useEffect, useState } from 'react';
import {
  ProfilePageContainer,
  ContentContainer,
  ProfileFormWrapper,
} from './styles';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const [updateUser] = useUpdateUserMutation();
  const { isLoading } = useGetUserQuery(null);
  const user = useAppSelector(getUserSelector);

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
      const response = await updateUser(requestData).unwrap();

      dispatch(setUser(response.data));
      setFormDisabled(true);
    } catch (err) {
      toast.error('Profile update error, try again!', toastConfig);
    }
  };

  useEffect(() => {
    if (user.email && !user.role) {
      toast.warning(
        'You need to fill your profile before start working!',
        toastConfig
      );
      setFormDisabled(false);
    }
  }, [user.email, user.role]);

  return (
    <ProfilePageContainer>
      <ContentContainer>
        {isLoading ? (
          <Spin />
        ) : (
          <ProfileFormWrapper>
            <ProfileForm
              submitForm={submitForm}
              disabled={formDisabled}
              setDisabled={setFormDisabled}
            />
          </ProfileFormWrapper>
        )}
      </ContentContainer>
    </ProfilePageContainer>
  );
}

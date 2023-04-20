import ProfileForm from 'components/ProfileForm';
import { useGetUserQuery, useUpdateUserMutation } from 'redux/api/userApi';
import { FormProfileData } from 'components/ProfileForm/types';
import { ROLES } from 'utils/constants/roles';
import { toast } from 'react-toastify';
import { toastConfig } from 'utils/toastConfig';
import dayjs from 'dayjs';
import { Spin } from 'antd';
import { useAppDispatch } from 'redux/hooks';
import { setUser } from 'redux/features/userSlice/userSlice';
import { useState } from 'react';
import {
  ProfilePageContainer,
  ContentContainer,
  ProfileFormWrapper,
} from './styles';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const [formDisabled, setFormDisabled] = useState(true);
  const [updateUser] = useUpdateUserMutation();
  const { isLoading } = useGetUserQuery(null);
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
      // console.log('RESPONSE', response);
      dispatch(setUser(response.data));
      setFormDisabled(true);
    } catch (err) {
      toast.error('Registration error, try again!', toastConfig);
    }
  };

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

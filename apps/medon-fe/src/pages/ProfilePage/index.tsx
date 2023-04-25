import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ProfileForm from 'components/ProfileForm';
import { FormProfileData } from 'components/ProfileForm/types';

import { useGetUserQuery, useUpdateUserMutation } from 'redux/api/userApi';
import { setUser } from 'redux/features/userSlice/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getTokenSelector,
  getUserSelector,
} from 'redux/features/userSlice/userSelectors';
import { ROLES } from 'utils/constants/roles';
import { toastConfig } from 'utils/toastConfig';
import {
  ProfilePageContainer,
  ContentContainer,
  ProfileFormWrapper,
} from './styles';

export default function ProfilePage() {
  const { t } = useTranslation();
  const isLoggedIn = useAppSelector(getTokenSelector);
  const dispatch = useAppDispatch();
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const [updateUser] = useUpdateUserMutation();
  const { isLoading } = useGetUserQuery(null, { skip: !isLoggedIn });
  const user = useAppSelector(getUserSelector);
  const warnMessage = t('profilePage.fillProfile');

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
      toast.success(t('profilePage.profileUpdated'), toastConfig);
    } catch (err) {
      toast.error(t('profilePage.updateError'), toastConfig);
    }
  };

  useEffect(() => {
    if (user.email && !user.role) {
      toast.warning(warnMessage, toastConfig);
      setFormDisabled(false);
    }
  }, [user.email, user.role, warnMessage]);

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

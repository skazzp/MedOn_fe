import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import {
  Container,
  Score,
  UserIcon,
  Block,
  IconCircle,
  Manage,
  IconUnion,
  Wrapper,
  TextWrap,
} from 'components/WithoutAppointments/styles';
import { routes } from 'utils/constants';

export function WithoutAppointments() {
  const { t } = useTranslation();
  const user = useAppSelector(getUserSelector);

  return (
    <Container>
      <Score>
        {t('dashboard.appointments')}{' '}
        <div>
          <UserIcon /> <span>0</span>
        </div>
      </Score>
      <Block>
        <Wrapper>
          <IconCircle />
          {user.role === 'remote' ? (
            <TextWrap>
              <Manage to={routes.availability}>
                {t('dashboard.manage')}
                <IconUnion />
              </Manage>
            </TextWrap>
          ) : (
            <TextWrap>
              <Manage to="/dashboard/appointments">
                {t('dashboard.book')}
                <IconUnion />
              </Manage>
            </TextWrap>
          )}
        </Wrapper>
      </Block>
    </Container>
  );
}

export default WithoutAppointments;

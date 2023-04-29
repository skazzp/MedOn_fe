import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';

import {
  Call,
  Info,
  InfoText,
  Wrapper,
  Name,
  InfoButton,
} from 'components/common/Attention/styles';
import { patientList } from 'utils/mock/patientList';

export function Attention() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useAppSelector(getUserSelector);

  return (
    <Call>
      <Wrapper>
        <Info />
        <InfoText>
          <p>{t('attention.call-time-left')}</p>
          <p>
            <Name>{`${patientList[0].sex === 'Male' ? 'Mr.' : 'Ms.'} ${
              patientList[0].lastName
            } `}</Name>
            and
            <Name> Dr. {`${user.lastName || 'Anonymous'}`}</Name>
          </p>
        </InfoText>
      </Wrapper>
      <InfoButton onClick={() => navigate('/dashboard/patients-card')}>
        Detail
      </InfoButton>
    </Call>
  );
}

export default Attention;

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
import { Gender, addressing, routes } from 'utils/constants';

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
            <Name>{`${
              patientList[0].gender === Gender.Male
                ? addressing.mr
                : addressing.ms
            } ${patientList[0].lastName} `}</Name>
            {t('attention.and')}
            <Name> Dr. {`${user.lastName || 'Anonymous'}`}</Name>
          </p>
        </InfoText>
      </Wrapper>
      <InfoButton onClick={() => navigate(routes.patientCard)}>
        {t('attention.detail')}
      </InfoButton>
    </Call>
  );
}

export default Attention;

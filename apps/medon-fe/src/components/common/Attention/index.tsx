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

interface IAttentionProps {
  startTime: string | Date;
  title: string;
  lastName: string | undefined;
  link: string;
}

export function Attention({ title, lastName, link }: IAttentionProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  console.log(link);

  return (
    <Call>
      <Wrapper>
        <Info />
        <InfoText>
          <p>{title}</p>
          <p>
            <Name> Dr. {lastName}</Name>
          </p>
        </InfoText>
      </Wrapper>
      <InfoButton onClick={() => navigate(link)}>
        {t('attention.detail')}
      </InfoButton>
    </Call>
  );
}

export default Attention;

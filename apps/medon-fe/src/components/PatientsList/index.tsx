import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import LinkHome from 'components/LinkHome';
import PatientListCard from 'components/PatientListCard';
import Button from 'components/Button';

import { patientList } from 'utils/mock/patientList';
import { ReactComponent as Plus } from 'assets/svgs/plus_listcard.svg';

import { Choose, Content, StyledSearch, Wrapper } from './styles';

export default function PatientsList() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Content>
      <h2>{t('patient-list.choose')}</h2>
      <Choose>
        <StyledSearch
          placeholder={`${t('patient-list.placeholder')}`}
          size="large"
        />
        <LinkHome
          textcolor={theme.colors.white}
          bgcolor={theme.colors.btnGradient}
          to="add-new"
        >
          {t('patient-list.link')}
          <Plus />
        </LinkHome>
      </Choose>
      <h2>{t('patient-list.list')}</h2>
      <Wrapper>
        {patientList.length ? (
          patientList.map((patient) => (
            <PatientListCard key={patient.id} {...patient} />
          ))
        ) : (
          <h4>{t('patient-list.no-data')}</h4>
        )}
        <Button
          textcolor={theme.colors.blue_500}
          bgcolor={theme.colors.blue_100}
        >
          {t('patient-list.load-more')}
        </Button>
      </Wrapper>
    </Content>
  );
}

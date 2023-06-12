import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Input, Spin } from 'antd';
import { Link } from 'components/Link';
import PatientListCard from 'components/PatientListCard';
import { useGetPatientsQuery } from 'redux/api/patientApi';
import { defaultLimit, defaultPage, roles, routes } from 'utils/constants';
import { useDebounce } from 'hooks/useDebounce';
import { IPatient } from 'interfaces/patients';
import { useAppSelector } from 'redux/hooks';
import {
  Choose,
  Content,
  Wrapper,
  SpinWrapper,
  StyledButton,
  StyledPlus,
} from './styles';

export default function PatientsList() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const debouncedSearch = useDebounce<string>(searchPhrase);

  const { role } = useAppSelector((state) => state.userState.user);

  const { data, isFetching } = useGetPatientsQuery({
    page,
    limit: defaultLimit,
    name: debouncedSearch,
  });

  useEffect(() => {
    setPage(defaultPage);
    setPatients([]);
  }, [searchPhrase]);

  useEffect(() => {
    if (data) {
      setPatients((prev) => prev.concat(data?.patients));
    }
  }, [data]);

  return (
    <Content>
      <h2>{t('patient-list.choose')}</h2>
      <Choose>
        <Input.Search
          placeholder={`${t('patient-list.placeholder')}`}
          size="large"
          allowClear
          loading={isFetching}
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
        {role === roles.local ? (
          <Link
            textcolor={theme.colors.white}
            bgcolor={theme.colors.btnGradient}
            to={routes.addPatient}
          >
            {t('patient-list.link')}
            <StyledPlus />
          </Link>
        ) : null}
      </Choose>
      {isFetching ? (
        <SpinWrapper>
          <Spin size="large" />
        </SpinWrapper>
      ) : (
        <Wrapper>
          {data && data.total > 0 ? (
            <>
              {patients.map((patient) => (
                <PatientListCard
                  id={patient.id}
                  key={patient.id}
                  firstName={patient.firstName}
                  lastName={patient.lastName}
                  gender={patient.gender}
                  dateOfBirth={patient.dateOfBirth.toString()}
                  overview={patient.overview ? patient.overview : undefined}
                  doctor={''}
                  maxLength={0}
                  time={''}
                />
              ))}
              {data.total > page * defaultLimit && (
                <StyledButton
                  type="primary"
                  size="large"
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                >
                  {t('patient-list.load-more')}
                </StyledButton>
              )}
            </>
          ) : (
            <h4>{t('patient-list.no-data')}</h4>
          )}
        </Wrapper>
      )}
    </Content>
  );
}

import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import LinkHome from 'components/LinkHome';
import PatientListCard from 'components/PatientListCard';
import { Button, Pagination } from 'antd';

import { ReactComponent as Plus } from 'assets/svgs/plus_listcard.svg';

import { useGetPatientsQuery } from 'redux/api/patientApi';
import { useState } from 'react';
import Spinner from 'components/Spinner';
import { Choose, Content, StyledSearch, Wrapper } from './styles';

export default function PatientsList() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchPhrase, setSearchPhrase] = useState('');

  const { data, error, isLoading } = useGetPatientsQuery({
    page,
    limit,
    searchPhrase,
  });

  function handlePaginationChange(page: number, pageSize: number): void {
    setPage(page);
    setLimit(pageSize);
  }

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
      {isLoading ? (
        <Spinner />
      ) : (
        <Wrapper>
          {data && data.total > 0 ? (
            <>
              {data.patients.map((patient) => (
                <PatientListCard
                  id={patient.id}
                  key={patient.id}
                  firstName={patient.firstName}
                  lastName={patient.lastName}
                  gender={patient.gender}
                  dateOfBirth={patient.dateOfBirth.toString()}
                  overview={patient.overview ? patient.overview : undefined}
                />
              ))}
              <Pagination
                current={page}
                pageSize={limit}
                total={data.total}
                showSizeChanger={true}
                defaultCurrent={1}
                defaultPageSize={5}
                pageSizeOptions={[5, 10, 20]}
                onChange={handlePaginationChange}
              />
            </>
          ) : (
            <h4>{t('patient-list.no-data')}</h4>
          )}
        </Wrapper>
      )}
    </Content>
  );
}

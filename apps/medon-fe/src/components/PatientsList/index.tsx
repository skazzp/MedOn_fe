import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Input, Pagination, Spin } from 'antd';
import LinkHome from 'components/LinkHome';
import PatientListCard from 'components/PatientListCard';
import { ReactComponent as Plus } from 'assets/svgs/plus_listcard.svg';
import { useGetPatientsQuery } from 'redux/api/patientApi';
import {
  defaultPageSize,
  defaultPage,
  pageSizeOptions,
} from 'utils/constants/pagination';
import { roles, routes } from 'utils/constants';
import { useDebounce } from 'hooks/useDebounce';
import { useAppSelector } from 'redux/hooks';
import { Choose, Content, Wrapper, SpinWrapper } from './styles';

export default function PatientsList() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const debouncedSearch = useDebounce<string>(searchPhrase);

  const { role } = useAppSelector((state) => state.userState.user);

  const { data, isFetching } = useGetPatientsQuery({
    page,
    limit,
    searchPhrase: debouncedSearch,
  });

  function handlePaginationChange(pageNumber: number, pageSize: number): void {
    setPage(pageNumber);
    setLimit(pageSize);
  }

  return (
    <Content>
      <h2>{t('patient-list.choose')}</h2>
      <Choose>
        <Input.Search
          placeholder={`${t('patient-list.placeholder')}`}
          size="large"
          loading={isFetching}
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
          onBlur={() => setSearchPhrase('')}
        />
        {role === roles.local ? (
          <LinkHome
            textcolor={theme.colors.white}
            bgcolor={theme.colors.btnGradient}
            to={routes.addPatient}
          >
            {t('patient-list.link')}
            <Plus />
          </LinkHome>
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
              {data.patients.map((patient) => (
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
              <Pagination
                current={page}
                pageSize={limit}
                total={data.total}
                showSizeChanger={true}
                defaultCurrent={defaultPage}
                defaultPageSize={defaultPageSize}
                pageSizeOptions={pageSizeOptions}
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

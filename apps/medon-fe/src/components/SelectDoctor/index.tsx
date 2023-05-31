import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Doctor, IAvailability } from 'redux/api/types';

import useSpecOptions from 'components/RegistrationForm/hooks';
import {
  ColumnName,
  ColumnText,
  Container,
  DoctorPic,
  FilterContainer,
  ItemWrap,
  List,
  ListItem,
  SearchBox,
  SearchContainer,
  SlotActive,
  StyledSearch,
  StyledSelect,
  Text,
  TitleBox,
  LoadMore,
} from 'components/SelectDoctor/styles';
import { filterUniqueDoctors } from 'components/SelectDoctor/hook';
import { SelectDoctorProps } from 'components/SelectDoctor/types';

import doctorImagePlaceholder from 'assets/images/Avatar.svg';
import { numberOfDoctors } from 'utils/constants/position';

export default function SelectDoctor({
  selectDoctorAppointments,
  selectedDoctor,
  isActiveDoc,
  setIsActiveDoc,
  data,
  selectedDoctorsById,
}: SelectDoctorProps) {
  const { t } = useTranslation();

  const { specialityOptions } = useSpecOptions();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpeciality, setSelectedSpeciality] = useState<number | string>(
    'all'
  );
  const [visibleDoctors, setVisibleDoctors] = useState<number>(numberOfDoctors);

  const doctors = data.map((avails: IAvailability) => avails.doctor);

  const uniqueDoctors = filterUniqueDoctors(doctors);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  const handleSpecialityChange = (value: number | string) => {
    setSelectedSpeciality(value);
  };

  const filteredDoctors = useMemo(() => {
    const fullNameSearchQuery = searchQuery.toLowerCase();
    const filteredBySpeciality =
      selectedSpeciality === 'all'
        ? uniqueDoctors
        : uniqueDoctors.filter(
            (doctor) => doctor.specialityId === selectedSpeciality
          );

    return filteredBySpeciality.filter((doctor) => {
      const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();

      return (
        fullName.includes(fullNameSearchQuery) &&
        selectedDoctorsById.includes(doctor.id)
      );
    });
  }, [searchQuery, selectedSpeciality, uniqueDoctors, selectedDoctorsById]);

  const selectDoctor = (key: number) => {
    if (key === selectedDoctor) {
      selectDoctorAppointments(null);
    } else {
      selectDoctorAppointments(key);
    }

    if (key === isActiveDoc) {
      setIsActiveDoc(null);
    } else {
      setIsActiveDoc(key);
    }
  };
  const showMoreDoctors = () => {
    const remainingDoctors = filteredDoctors.length - visibleDoctors;
    const showCount = Math.min(3, remainingDoctors);

    if (showCount > 0) {
      setVisibleDoctors((prevCount) => prevCount + showCount);
    }
  };

  const visibleFilteredDoctors = filteredDoctors.slice(0, visibleDoctors);

  return (
    <Container>
      <SearchContainer>
        <SearchBox>
          <StyledSearch
            placeholder={`${t('appointment.searchPlaceholder')}`}
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchQuery}
            size="large"
          />
        </SearchBox>
        <FilterContainer>
          <Text>{t('appointment.filterLabel')} </Text>
          <StyledSelect
            defaultValue="all"
            onSelect={(value) =>
              handleSpecialityChange(value as number | string)
            }
            size="large"
            options={[
              { value: 'all', label: t('appointment.allLabel') },
              ...specialityOptions,
            ]}
          />
        </FilterContainer>
      </SearchContainer>
      <TitleBox>
        <ColumnName>{t('appointment.columns.name')}</ColumnName>
        <ColumnName>{t('appointment.columns.speciality')}</ColumnName>
        <ColumnName>{t('appointment.columns.located')}</ColumnName>
      </TitleBox>
      <List>
        {visibleFilteredDoctors.map((doctor: Doctor) => (
          <ListItem key={doctor.id}>
            <ItemWrap
              onClick={() => selectDoctor(doctor.id)}
              style={isActiveDoc === doctor.id ? SlotActive : {}}
            >
              <ColumnText>
                <DoctorPic
                  src={doctor.photo || doctorImagePlaceholder}
                  alt={`${t('appointment.doctorPicAlt')}`}
                />
                {t('appointment.prefix-doctor')}
                {doctor.firstName[0]}. {doctor.lastName}
              </ColumnText>
              <ColumnText>
                {specialityOptions.length ? doctor.speciality.name : ''}
              </ColumnText>
              <ColumnText>
                {doctor.country}, {doctor.city}
              </ColumnText>
            </ItemWrap>
          </ListItem>
        ))}
        {filteredDoctors.length > visibleDoctors && (
          <LoadMore onClick={showMoreDoctors}>
            {t('patient-list.load-more')}
          </LoadMore>
        )}
      </List>
    </Container>
  );
}

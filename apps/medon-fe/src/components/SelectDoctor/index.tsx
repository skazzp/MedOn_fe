import { useState } from 'react';
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
} from 'components/SelectDoctor/styles';
import { filterUniqueDoctors } from 'components/SelectDoctor/hook';
import { SelectDoctorProps } from 'components/SelectDoctor/types';

import doctorImagePlaceholder from 'assets/images/Avatar.svg';

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

  const doctors = data.map((avails: IAvailability) => avails.doctor);

  const uniqueDoctors = filterUniqueDoctors(doctors);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  const handleSpecialityChange = (value: number | string) => {
    setSelectedSpeciality(value);
  };

  const filteredDoctors = uniqueDoctors.filter((doctor: Doctor) => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    return selectedSpeciality === 'all'
      ? fullName.includes(lowerCaseSearchQuery)
      : fullName.includes(lowerCaseSearchQuery) &&
          doctor.specialityId === selectedSpeciality;
  });

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
        {filteredDoctors
          .filter((doctor: Doctor) => selectedDoctorsById.includes(doctor.id))
          .map((doctor: Doctor) => (
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
      </List>
    </Container>
  );
}

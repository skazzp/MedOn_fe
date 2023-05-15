import { useTranslation } from 'react-i18next';

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
import { mockDoctors } from 'components/SelectDoctor/mockData';
import { SelectDoctorProps } from 'components/SelectDoctor/types';

import doctorImagePlaceholder from 'assets/images/Avatar.svg';

export default function SelectDoctor({
  selectDoctorAppointments,
  selectedDoctor,
  isActiveDoc,
  setIsActiveDoc,
  uniqDocId,
}: SelectDoctorProps) {
  const { t } = useTranslation();

  const { specialityOptions } = useSpecOptions();

  console.log(uniqDocId);

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
            onSearch={() => {}}
            size="large"
          />
        </SearchBox>
        <FilterContainer>
          <Text>{t('appointment.filterLabel')} </Text>
          <StyledSelect
            defaultValue="all"
            onChange={() => {}}
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
        {mockDoctors.map((doctor) => (
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
                {specialityOptions.length
                  ? specialityOptions[doctor.specialityId].label
                  : ''}
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

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import useSpecOptions from 'components/RegistrationForm/useSpecOptions';
import doctorImagePlaceholder from 'assets/images/Avatar.svg';
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
  TextBox,
  TitleBox,
} from './styles';
import { mockDoctors } from './mockData';

export default function SelectDoctor() {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<number | null>(null);
  const { specialityOptions } = useSpecOptions();
  const selectDoctor = (key: number) => {
    if (key === isActive) {
      setIsActive(null);
    } else {
      setIsActive(key);
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
              { value: 'all', label: 'All doctors' },
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
      <TextBox>
        <Text>{t('appointment.visited')}</Text>
      </TextBox>
      <List>
        {mockDoctors.map((doctor) => (
          <ListItem key={doctor.id}>
            <ItemWrap
              onClick={() => selectDoctor(doctor.id)}
              style={isActive === doctor.id ? SlotActive : {}}
            >
              <ColumnText>
                <DoctorPic
                  src={doctor.photo || doctorImagePlaceholder}
                  alt=""
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

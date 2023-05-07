import useSpecOptions from 'components/RegistrationForm/useSpecOptions';
import doctorImagePlaceholder from 'assets/images/Avatar.svg';
import {
  ColumnName,
  ColumnText,
  Container,
  DoctorPic,
  FilterContainer,
  List,
  ListItem,
  SearchBox,
  SearchContainer,
  StyledSearch,
  StyledSelect,
  Text,
  TextBox,
  TitleBox,
} from './styles';
import { mockDoctors } from './mockData';

export default function SelectDoctor() {
  const { specialityOptions } = useSpecOptions();

  return (
    <Container>
      <SearchContainer>
        <SearchBox>
          <StyledSearch
            placeholder="Find a doctor by name..."
            onSearch={() => {}}
            size="large"
          />
        </SearchBox>
        <FilterContainer>
          <Text>Speciality: </Text>
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
        <ColumnName>Name</ColumnName>
        <ColumnName>Speciality</ColumnName>
        <ColumnName>Located</ColumnName>
      </TitleBox>
      <TextBox>
        <Text>You previously visited:</Text>
      </TextBox>
      <List>
        {mockDoctors.map((elem) => (
          <ListItem>
            <ColumnText>
              <DoctorPic src={elem.photo || doctorImagePlaceholder} alt="" />
              Dr. {elem.firstName[0]}. {elem.lastName}
            </ColumnText>
            <ColumnText>
              {specialityOptions[elem.specialityId].label}
            </ColumnText>
            <ColumnText>
              {elem.country}, {elem.city}
            </ColumnText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

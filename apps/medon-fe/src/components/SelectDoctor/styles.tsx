import styled from 'styled-components';
import { Input, Select } from 'antd';
import { theme } from 'styles/theme';

const { Search } = Input;

export const Container = styled.div`
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
`;

export const SearchBox = styled.div`
  width: 60%;
`;

export const StyledSearch = styled(Search)`
  width: 100%;
`;

export const StyledSelect = styled(Select)`
  width: 150px;
`;

export const Text = styled.p`
  margin: 0;
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.md};
`;

export const TitleBox = styled.div`
  width: 100%;
  padding-top: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

export const ColumnText = styled.div`
  width: calc(100% / 3);
  display: flex;
  justify-content: start;
  align-items: center;
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.md};
`;

export const ColumnName = styled(ColumnText)`
  font-weight: ${(p) => p.theme.fontWeight.medium};
`;

export const TextBox = styled.div`
  width: calc(100% - 50px);
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.sm};
`;

export const List = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
`;

export const ListItem = styled.li`
  width: 100%;
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 1px solid ${(p) => p.theme.colors.gray_300};
  border-bottom: 1px solid ${(p) => p.theme.colors.gray_300};
`;

export const ItemWrap = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 10px;
  display: flex;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;
  &:hover {
    border: 1px solid ${(p) => p.theme.colors.icon_active};
    background-color: ${(p) => p.theme.colors.white};
  }
`;

export const DoctorPic = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;

export const SlotActive = {
  backgroundColor: theme.colors.blue_300,
  borderColor: theme.colors.blue_300,
  color: theme.colors.white,
};

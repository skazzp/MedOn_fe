import styled from 'styled-components';
import { Select, SelectProps } from 'antd';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sf_pro_text};
  font-size: 12px;
`;

export const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.gray_300};
`;

export const CustomSelect = styled(Select)<SelectProps>`
  .ant-select-selector {
    background-color: ${({ theme }) =>
      theme.colors.BACKGROUND_PRIMARY} !important;
  }
`;

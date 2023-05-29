import styled from 'styled-components';
import { theme } from 'styles/theme';

export const BtnStyled = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-weight: ${theme.fontWeight.medium};
  width: 160px;
  margin-right: 20px;
  &:hover {
    text-decoration: underline;
    color: ${theme.colors.icon_active};
  }
`;

export const Container = styled.div`
  font-family: ${theme.fontFamily.sf_pro_text};
`;


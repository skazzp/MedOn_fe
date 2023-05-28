import styled from 'styled-components';
import { theme } from 'styles/theme';

export const BtnStyled = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  font-family: ${theme.fontFamily.sf_pro_text};
  width: 160px;
  margin-right: 20px;
`;

export const Container = styled.div`
  font-family: ${theme.fontFamily.sf_pro_text};
`;

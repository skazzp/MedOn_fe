import styled from 'styled-components';
import { theme } from 'styles/theme';

export const BtnStyled = styled.button`
  text-decoration: none;
  color: ${theme.colors.navi_text};
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.md};
  margin: 0;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 10px;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.7s;
  border: none;
  width: 100%;

  &.active {
    background-color: ${theme.colors.navi_hover};
    color: ${theme.colors.icon_active};
  }

  &.active svg {
    fill: ${theme.colors.icon_active};
  }

  &:hover {
    background-color: ${theme.colors.navi_hover};
    color: ${theme.colors.icon_active};
  }
  &:hover svg {
    fill: ${theme.colors.icon_active};
  }
`;

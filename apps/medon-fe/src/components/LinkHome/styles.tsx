import styled from 'styled-components';
import { LinkHomeStyledProps } from './LinkHomeTypes';

export const StyledLinkHome = styled.a<LinkHomeStyledProps>`
  text-decoration: transparent;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily.roboto};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
`;

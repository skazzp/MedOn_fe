import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { LinkHomeStyledProps } from 'components/Link/types';

export const StyledLink = styled(Link)<LinkHomeStyledProps>`
  text-decoration: transparent;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily.roboto};
  background: ${({ bgcolor }) => bgcolor};
  color: ${({ textcolor }) => textcolor};
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  width: ${({ isfullwidth }) => (isfullwidth ? '100%' : 'fit-content')};
`;

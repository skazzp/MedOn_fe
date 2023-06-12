import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { LinkStyledProps } from 'components/Link/types';

export const StyledLink = styled(Link)<LinkStyledProps>`
  text-decoration: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  background: ${({ bgcolor }) => bgcolor};
  color: ${({ textcolor }) => textcolor};
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  width: ${({ isfullwidth }) => (isfullwidth ? '100%' : 'fit-content')};
`;

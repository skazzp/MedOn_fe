import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const StyledImg = styled.img`
  width: 20px;
`;

export const StyledSpan = styled.span`
  color: ${({ theme }) => theme.colors.blue_300};
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

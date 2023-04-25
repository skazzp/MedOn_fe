import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const ErrorMsg = styled.p`
  position: absolute;
  margin-top: 0.2rem;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
  letter-spacing: 0em;
  color: ${theme.colors.red_500};
`;

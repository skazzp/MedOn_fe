import styled from "styled-components";
import { theme } from "styles/theme";


export const Title = styled.h1`
  color: ${theme.colors.title};
  font-family: ${theme.fontFamily.roboto};
  font-style: normal;
  font-weight: 700;
  font-size: ${theme.fontSizes.xl};
  line-height: 3.5rem;
  margin-bottom: 1rem
`;

export const Text = styled.div`
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.md};
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  margin-bottom: 2.5rem
`;
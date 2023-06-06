import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Wrapper = styled.div`
  font-family: ${theme.fontFamily.sf_pro_text};
  padding: 40px 120px 120px;
  width: 100%;

  h3 {
    font-size: ${theme.fontSizes.md};
    font-family: ${theme.fontFamily.sf_pro_text} !important;
  }

  p {
    font-size: ${theme.fontSizes.md};
    font-family: ${theme.fontFamily.sf_pro_text} !important;
  }

  span {
    font-size: ${theme.fontSizes.lg};
    font-family: ${theme.fontFamily.sf_pro_text} !important;
  }

  ol {
    font-size: ${theme.fontSizes.md};
    list-style: none;
    counter-reset: custom-counter;
  }

  ol li {
    counter-increment: custom-counter;
    font-family: ${theme.fontFamily.sf_pro_text} !important;
  }

  ol li::before {
    content: counter(custom-counter) '. ';
    color: ${theme.colors.blue_300};
    font-weight: ${theme.fontWeight.bold};
    font-family: ${theme.fontFamily.sf_pro_text} !important;
  }
`;

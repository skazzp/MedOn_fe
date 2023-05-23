import { createGlobalStyle } from 'styled-components';
import { theme } from 'styles/theme';

export const GlobalStyle = createGlobalStyle`
  .rcw-header {
    background: ${theme.colors.blue_300} !important;
  }

  .rcw-message-text {
    background: ${theme.colors.blue_100} !important;
  }

  .rcw-launcher {
    background: ${theme.colors.blue_300} !important;
  }
`;

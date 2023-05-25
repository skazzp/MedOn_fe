import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
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

  .rcw-message {
    position: relative;
  }
`;

export const DateWrapper = styled.div`
  font-size: ${theme.fontSizes.sm};
  margin-top: -4px;
  position: absolute;
  right: 0;
`;

export const DateWrapperReply = styled.div`
  font-size: ${theme.fontSizes.sm};
  margin-top: -4px;
  position: absolute;
  left: 0;
`;

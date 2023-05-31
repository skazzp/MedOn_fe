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
    margin: 20px 10px !important;
  }
`;

export const DateWrapper = styled.div`
  font-size: ${theme.fontSizes.sm};
  position: absolute;
  top: -14px;
`;

export const DateWrapperMessage = styled(DateWrapper)`
  right: 0;
`;

export const DateWrapperReply = styled(DateWrapper)`
  left: 0;
`;

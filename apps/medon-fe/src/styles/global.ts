import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  html,body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.gray_100};
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

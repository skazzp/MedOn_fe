import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  html,body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.GRAY_100};
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: calc(100% - 100px);
  margin: 0 auto;
  min-height: 100vh;
  height: 100%;
  font-family: ${theme.fontFamily.roboto};
`;

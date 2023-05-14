import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  margin: 0 20px;
  overflow: auto;
`;

export const Choose = styled.div`
  position: relative;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray_400};
  padding-bottom: 160px;
`;

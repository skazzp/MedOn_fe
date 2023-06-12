import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Container = styled.div`
  display: flex;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const NotificationContainer = styled.div`
  background-color: ${theme.colors.gray_100};
  position: sticky;
  top: 0px;
  z-index: 1;
`;

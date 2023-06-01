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
  font-family: ${theme.fontFamily.sf_pro_text};
`;

export const AppointmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  gap: 1rem;
  margin-bottom: 3rem;
  > button {
    margin: 0 auto;
    border: 2px solid ${theme.colors.blue_400};
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const NotFound = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  color: ${theme.colors.blue_500};
  font-size: ${theme.fontSizes.xxl};
  flex: 0.9;
`;

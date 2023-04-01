import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.blue_500};
  font-family: ${({ theme }) => theme.typography.fontFamily.roboto};
`;

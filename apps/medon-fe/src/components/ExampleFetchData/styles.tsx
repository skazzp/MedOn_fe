import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.BLUE_500};
  font-family: ${({ theme }) => theme.fontFamily.roboto};
`;

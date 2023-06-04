import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  word-break: break-word;

  > button {
    background-color: transparent;
    border: transparent;
    text-align: left;
    padding: 0;
    color: ${({ theme }) => theme.colors.blue_500};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    cursor: pointer;
  }
  > p {
    margin: 0;
  }
`;

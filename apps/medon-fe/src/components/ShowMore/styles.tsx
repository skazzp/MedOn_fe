import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > button {
    background-color: transparent;
    border: transparent;
    text-align: left;
    color: ${({ theme }) => theme.colors.blue_500};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.4;
    padding: 0;
    margin-top: 5px;
    cursor: pointer;
    width: 75px;
  }
`;

export const PrefixText = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.blue_900};
`;

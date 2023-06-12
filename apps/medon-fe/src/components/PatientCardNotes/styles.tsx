import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray_400};
  background-color: ${({ theme }) => theme.colors.gray_100};
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem;
`;

export const Date = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray_700};
`;

export const Time = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray_500};
`;

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
  padding: 1rem 0;
  margin: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_400};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_400};
  textarea {
    width: 100%;
    height: 100%;
    resize: none;
    font-weight: 500;
  }
`;

export const Doctor = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.blue_500};
`;

export const Top = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  font-family: SF Pro Text, sans-serif;
  border: 0;
  background-color: inherit;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue_500};
  font-weight: 700;
  font-size: 14px;
`;

export const BlocksButton = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 100px;
  margin-left: 15px;
`;

export const RowButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

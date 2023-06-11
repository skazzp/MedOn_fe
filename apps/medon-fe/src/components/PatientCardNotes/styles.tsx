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
  padding: 1rem 0;
  margin: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_400};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_400};
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

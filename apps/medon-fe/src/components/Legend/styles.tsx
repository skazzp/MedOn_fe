import styled from 'styled-components';

export const Dot = styled.div<{ color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background-color: ${({ color }) => color};
`;

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-bottom: 1rem;
  > legend {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TextSubtitle = styled.legend`
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

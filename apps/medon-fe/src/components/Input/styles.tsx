import styled from 'styled-components';

export const StyledInput = styled.input`
  display: block;
  border: transparent;
  border-radius: 0.5rem;
  padding: 1rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  font-size: 1rem;
`;

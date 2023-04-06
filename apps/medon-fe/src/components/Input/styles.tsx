import styled from 'styled-components';

import { InputStyledProps } from 'components/Input/types';

export const StyledInput = styled.input<InputStyledProps>`
  display: block;
  border: transparent;
  border-radius: 0.5rem;
  padding: 1rem 0.75rem;
  border: 1px solid
    ${({ theme, errorBorder }) =>
      errorBorder ? theme.colors.red_500 : theme.colors.gray_400};
  font-size: ${({ theme }) => theme.fontSizes.md};
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ErrorNotification = styled.span`
  color: ${({ theme }) => theme.colors.red_500};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: 0 0.5rem;
`;

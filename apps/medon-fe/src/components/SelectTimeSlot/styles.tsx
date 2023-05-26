import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';

interface TimeSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  gap: 10px;
  padding: 0 30px;
`;

export const TimeSlot = styled.div<TimeSlotProps>`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: 8px;
  border: 2px solid ${(p) => p.theme.colors.gray_400};
  transition: all 0.3s ease-in-out;
  &:hover {
    border-color: ${(p) => p.theme.colors.icon_active};
    cursor: pointer;
  }
  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const TimeText = styled.p`
  margin: 0;
  margin-bottom: 5px;
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.md};
  font-weight: ${(p) => p.theme.fontWeight.medium};
`;

export const DrText = styled.p`
  margin: 0;
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.sm};
`;

export const SlotActive = {
  backgroundColor: theme.colors.blue_300,
  borderColor: theme.colors.blue_300,
  color: theme.colors.white,
};

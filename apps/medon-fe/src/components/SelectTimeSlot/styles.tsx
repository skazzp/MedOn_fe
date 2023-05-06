import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Container = styled.div`
  width: calc(100% - 50px);
  height: 250px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px; // remove after combined with page components
`;

export const TimeSlot = styled.div`
  width: calc((100% - 100px) / 6);
  height: 60px;
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

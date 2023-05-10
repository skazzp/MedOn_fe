import styled from 'styled-components';
import { ReactComponent as Time } from 'assets/images/Time.svg';
import { Button } from 'antd';
import { theme } from 'styles/theme';

export const Icon = styled.div`
  margin-right: 15px;
  display: flex;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
  font-family: ${theme.fontFamily.roboto};
`;

export const ShowMore = styled(Button)`
  width: 15vw;
  margin: 0 auto;
  color: ${theme.colors.icon_active};
  border: 1px solid ${theme.colors.icon_active};
  font-weight: ${theme.fontWeight.bold};
`;

export const TextTime = styled.p`
  display: flex;
  align-items: center;
`;
export const TimeIcon = styled(Icon).attrs(() => ({
  children: <Time />,
}))``;

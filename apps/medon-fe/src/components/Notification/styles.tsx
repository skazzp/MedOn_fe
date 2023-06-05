import styled, { DefaultTheme, ThemedStyledProps } from 'styled-components';
import { ReactComponent as InfoIcon } from 'assets/images/dashboard/Info.svg';
import { theme } from 'styles/theme';
import Button from 'components/Button';

interface CallProps {
  type: 'current' | 'upcoming';
}

const notificationColor = (props: ThemedStyledProps<CallProps, DefaultTheme>) =>
  props.type === 'current' ? theme.colors.blue_500 : theme.colors.green_500;

export const Call = styled.div<CallProps>`
  display: flex;
  align-items: center;
  margin: 40px 40px 20px;
  padding: 16px 20px;
  justify-content: space-between;
  border: 1.5px solid ${notificationColor};
  border-radius: 4px;

  svg {
    fill: ${notificationColor};
  }

  span {
    color: ${notificationColor};
    font-weight: ${theme.fontWeight.bold};
  }

  button {
    padding: 12px 24px;
    color: ${notificationColor};
    font-weight: ${theme.fontWeight.bold};
    background-color: ${theme.colors.attentionBnt};
    transition: all 0.7s;
    &:hover {
      background-color: ${notificationColor};
      color: ${theme.colors.navi_hover};
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoText = styled.div`
  p {
    margin: 0;
    font-family: ${theme.fontFamily.sf_pro_text};
  }
`;

export const Icon = styled.div`
  margin-right: 16px;
`;

export const Info = styled(Icon).attrs(() => ({
  children: <InfoIcon />,
}))``;

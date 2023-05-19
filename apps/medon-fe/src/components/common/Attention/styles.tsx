import styled from 'styled-components';
import { ReactComponent as InfoIcon } from 'assets/images/dashboard/Info.svg';
import { theme } from 'styles/theme';
import Button from 'components/Button';

export const Call = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  justify-content: space-between;
  border: 1.5px solid ${theme.colors.attentionSuccess};
  border-radius: 4px;
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
  svg {
    fill: ${theme.colors.attentionSuccess};
  }
`;

export const Name = styled.span`
  color: ${theme.colors.attentionSuccess};
  font-weight: ${theme.fontWeight.bold};
`;

export const InfoButton = styled(Button)`
  padding: 12px 24px;
  color: ${theme.colors.attentionSuccess};
  font-weight: ${theme.fontWeight.bold};
  background-color: ${theme.colors.attentionBnt};
  transition: all 0.7s;
  &:hover {
    background-color: ${theme.colors.attentionSuccess};
    color: ${theme.colors.navi_hover};
  }
`;

export const Info = styled(Icon).attrs(() => ({
  children: <InfoIcon />,
}))``;

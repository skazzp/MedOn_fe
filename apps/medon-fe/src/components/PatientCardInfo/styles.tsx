import styled from 'styled-components';
import { Button } from 'antd';
import { theme } from 'styles/theme';

export const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Info = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    display: inline-block;
  }
`;

export const StyledButton = styled(Button)`
  display: flex;
  font-weight: ${theme.fontWeight.medium};
  padding: 14px 28px !important;
  gap: 5px;
  color: ${theme.colors.blue_500};
  justify-content: center;
  align-items: center;
  border-color: ${theme.colors.blue_500};

  &:hover {
    border-color: ${theme.colors.blue_500} !important;
    color: ${theme.colors.blue_500} !important;
  }
`;

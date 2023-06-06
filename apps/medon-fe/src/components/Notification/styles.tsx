import styled, {
  DefaultTheme,
  keyframes,
  ThemedStyledProps,
} from 'styled-components';

import { theme } from 'styles/theme';

interface CallProps {
  type: 'current' | 'upcoming';
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const borderColor = (props: ThemedStyledProps<CallProps, DefaultTheme>) =>
  props.type === 'current' ? theme.colors.blue_500 : theme.colors.green_500;

const bgColor = (props: ThemedStyledProps<CallProps, DefaultTheme>) =>
  props.type === 'current' ? theme.colors.blue_100 : theme.colors.green_100;

export const Wrapper = styled.div<CallProps>`
  animation: ${fadeIn} 0.5s ease-in-out;
  font-family: ${theme.fontFamily.sf_pro_text};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 20px;
  margin: 20px 40px 10px 40px;
  border: 2px solid ${borderColor};
  border-radius: 5px;

  button {
    padding: 10px 25px;
    border: none;
    color: ${borderColor};
    background-color: ${bgColor};
    border-radius: 5px;

    :hover {
      cursor: pointer;
    }
  }

  svg {
    & path {
      fill: ${borderColor};
    }
  }

  p {
    margin: 2px;
  }

  span {
    color: ${borderColor};
    font-weight: ${theme.fontWeight.bold};
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  gap: 10px;
  display: flex;
  align-items: center;
`;

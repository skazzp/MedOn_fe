import { Button } from 'antd';
import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  justify-content: flex-start;
  width: calc(100% - 100px);
  margin: 0 auto;
  min-height: 100vh;
  height: 100%;
  > h2 {
    font-size: 1.75rem;
    font-weight: 700;
  }
`;

export const Choose = styled.div`
  flex-shrink: 1;
  display: flex;
  width: 100%;
  gap: 2rem;
  margin-bottom: 4rem;
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 0 1.5rem;
    gap: 1rem;
  }
  input {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 3rem;
  > h4 {
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    color: ${({ theme }) => theme.colors.blue_500};
    flex: 0.5;
    justify-content: center;
    align-items: center;
  }
`;

export const SpinWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  width: 200px;
  font-size: ${({ theme }) => theme.fontSizes.md} !important;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text} !important;
`;

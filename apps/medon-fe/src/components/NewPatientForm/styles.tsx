import styled from 'styled-components';
import { Button } from 'antd';

export const Container = styled.div`
  max-width: 900px;
  min-width: 600px;
  width: 80%;
  padding: 50px;
  margin: 40px auto 0px;
  border: 1px solid ${(p) => p.theme.colors.gray_400};
  border-radius: 4px;
  background-color: ${(p) => p.theme.colors.white};
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
`;

export const Header = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
export const InputWrapper = styled.div``;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 20px;

  button {
    width: 140px;
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 50%;
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: block;
  margin-bottom: 4px;
`;

export const ErrorMsg = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.red_500};
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
`;

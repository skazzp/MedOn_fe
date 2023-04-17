import { theme } from 'styles/theme';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import GoogleButton from 'react-google-button';

export const FormContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  align-items: flex-start;
  margin-left: 20vw;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 27rem;
  grid-gap: 2rem;
  input {
    width: 100%;
  }
  label {
    font-family: ${theme.fontFamily.sf_pro_text};
    font-size: ${theme.fontSizes.sm};
    font-weight: 600;
    line-height: 21px;
    text-align: left;
    position: relative;
  }
`;

export const SendButton = styled(Input)`
  background: ${theme.colors.blue_300};
  color: ${theme.colors.white};
  cursor: pointer;
  padding: 16px 24px 16px 24px;
`;

export const StyledErrorMessage = styled.p`
  color: ${theme.colors.red_500};
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: ${(p) => p.theme.fontSizes.xs};
  font-weight: 400;
  position: absolute;
`;

export const ForgotButton = styled(Button)`
  margin-left: 70%;
`;

export const DontHaveButton = styled(Button)`
  margin-right: 70%;
  color: ${theme.colors.black};
`;
export const StyledGoogle = styled(GoogleButton)`
  width: 100% !important;
`;

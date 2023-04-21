import styled from 'styled-components';
import { Button, DatePicker } from 'antd';
import { theme } from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.xs};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27rem;
  gap: 1.5rem;
`;

export const InputContainer = styled.div`
  display: block;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  background: ${theme.colors.btnGradient};
  font-family: ${theme.fontFamily.sf_pro_text};
  color: ${theme.colors.white};
  min-width: 10rem;
  padding: 8px;
  font-size: ${theme.fontSizes.sm};
  font-weight: bold;
  width: 200;
`;

export const ButtonContainer = styled.div`
  display: flex;
  padding: 24px;
  justify-content: space-between;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export const LabelText = styled.p`
  margin-top: 0;
  margin-bottom: 0.2rem;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.sm};
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0em;
`;

export const ErrorMsg = styled.p`
  position: absolute;
  margin-top: 0.2rem;
  width: 13rem;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
  letter-spacing: 0em;
  color: ${theme.colors.red_500};
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  input {
    cursor: default !important;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const AntInputDisabledStyle = {
  backgroundColor: theme.colors.gray_100,
  color: theme.colors.black,
  cursor: 'default',
};

export const AntInputStyle = {
  backgroundColor: theme.colors.white,
  color: theme.colors.black,
};

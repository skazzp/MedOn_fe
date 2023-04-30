import { Button, DatePicker, Select } from 'antd';
import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Container = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27rem;
  gap: 1.5rem;
`;
export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledSelect = styled(Select)`
  width: 100%;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const PasswordContainer = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  width: 27rem;
  position: relative;
`;

export const LabelShort = styled.label`
  width: 13rem;
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

export const PassErrorMsg = styled(ErrorMsg)`
  width: 27rem;
`;

export const BtnContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export const Btn = styled(Button)`
  background: ${theme.colors.btnGradient};
  font-family: ${theme.fontFamily.sf_pro_text};
  color: ${theme.colors.white};
  min-width: 10rem;
`;

export const BackBtn = styled(Btn)`
  background: ${theme.colors.black};
`;

import styled from 'styled-components';
import { DatePicker } from 'antd';
import { theme } from 'styles/theme';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.xs};
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
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
  letter-spacing: 0em;
  color: ${theme.colors.red_500};
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  input {
    &:disabled {
      cursor: default !important;
      color: ${theme.colors.black} !important;
    }
  }
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

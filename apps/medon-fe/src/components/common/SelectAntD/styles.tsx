import { Select } from 'antd';
import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Container = styled.div`
  position: relative;
  width: 100%;
  .ant-select-item-option-content {
    font-family: ${theme.fontFamily.sf_pro_text} !important;
    font-size: ${theme.fontSizes.sm} !important;
  }

  .ant-select-item-option-content {
    font-family: ${theme.fontFamily.sf_pro_text} !important;
    font-size: ${theme.fontSizes.sm} !important;
  }
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

export const StyledSelect = styled(Select)`
  width: 100%;
  &.ant-select-disabled {
    cursor: default !important;
  }
  .ant-select-selector {
    color: ${theme.colors.black} !important;
    background-color: ${(p) =>
      p.disabled && p.theme.colors.gray_100} !important;
    cursor: inherit !important;
  }
  span {
    font-family: ${theme.fontFamily.sf_pro_text} !important;
    font-size: ${theme.fontSizes.md} !important;
  }
  input {
    cursor: text !important;
    font-family: ${theme.fontFamily.sf_pro_text} !important;
    font-size: ${theme.fontSizes.md} !important;
  }
  .ant-select-dropdown {
    font-family: ${theme.fontFamily.sf_pro_text} !important;
    font-size: ${theme.fontSizes.md} !important;
  }
`;

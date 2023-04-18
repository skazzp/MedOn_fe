import { Select } from 'antd';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    color: ${({ theme }) => theme.colors.black} !important;
    background-color: ${(p) =>
      p.disabled && p.theme.colors.gray_100} !important;
    cursor: default !important;
  }
  input {
    cursor: default !important;
  }
`;

export const LabelText = styled.p`
  margin-top: 0;
  margin-bottom: 0.2rem;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0em;
`;

export const ErrorMsg = styled.p`
  position: absolute;
  margin-top: 0.2rem;
  width: 13rem;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 400;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.colors.red_500};
`;

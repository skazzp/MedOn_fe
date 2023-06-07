import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  width: 200px;
  background: ${({ theme }) => theme.colors.btnGradient} !important;
  font-size: ${({ theme }) => theme.fontSizes.md} !important;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text} !important;
`;

export const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

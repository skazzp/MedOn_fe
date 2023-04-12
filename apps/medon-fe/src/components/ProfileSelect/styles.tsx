import { Select } from 'antd';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  width: 100%;
`;

export const LabelText = styled.p`
  margin-top: 0;
  margin-bottom: 0.2rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.sf_pro_text};
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0em;
`;

export const ErrorMsg = styled.p`
  position: absolute;
  margin-top: 0.2rem;
  width: 13rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.sf_pro_text};
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.colors.red_500};
`;

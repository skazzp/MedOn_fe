import { Input } from 'antd';
import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Container = styled.div`
  position: relative;
  width: 100%;
  textarea {
    font-family: ${theme.fontFamily.sf_pro_text} !important;
    font-size: ${theme.fontSizes.md} !important;
    height: 122px !important;
  }
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

export const StyledTextarea = styled(Input.TextArea)`
  position: relative;
  .textarea {
    margin-bottom: 1.25rem;
    height: 103px !important;
  }
  .countMore {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0.5rem;
    margin-top: 1rem;
    font-size: ${theme.fontSizes.sm} !important;
  }
`;

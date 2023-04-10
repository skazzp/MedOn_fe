import { theme } from 'styles/theme';
import styled from "styled-components";
import { Button, Input } from 'antd';


export const FormContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  align-items: flex-start;
  margin-left: 20rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 27rem;
  grid-gap: 1.1rem;
    input {
      width: 100%;
    }
    label {
      font-family: ${theme.fontFamily.sf_pro_text};
      font-size: .9rem;
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
`;

export const StyledErrorMessage = styled.p`
  color: ${theme.colors.red_500};
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-size: 0.8rem;
  font-weight: 400;
  position: absolute;
`;

export const ForgotButton = styled(Button)`
text-align: right;
`;

export const DontHaveButton = styled(Button)`
text-align: left;
color: ${theme.colors.black}
`;


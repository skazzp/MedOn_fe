import styled from 'styled-components';
import { theme } from 'styles/theme';
import PhoneNumberInput from 'react-phone-number-input';

export const Container = styled.div`
  position: relative;
  width: 100%;
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

export const StyledPhoneNumberInput = styled(PhoneNumberInput)`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  background: #fff;

  input {
    border: none;
    outline: none;
    ::placeholder {
      font-family: ${theme.fontFamily.sf_pro_text};
      font-size: ${theme.fontSizes.md};
      opacity: 0.4;
    }
  }

  img {
    border: none;
  }
`;

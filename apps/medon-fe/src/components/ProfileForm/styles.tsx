import styled from 'styled-components';
import { Button, DatePicker } from 'antd';
import { theme } from 'styles/theme';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 60px 40px;
  border: 1px solid ${(p) => p.theme.colors.gray_400};
  border-radius: 4px;
  background-color: ${theme.colors.white};
`;

export const MainInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DrNameText = styled.p`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.bold};
  line-height: 1.5;
  margin-top: 0;
  margin-bottom: 12px;
`;

export const EmailLabel = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.md};
`;

export const EmailText = styled.p`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.medium};
  line-height: 1.8;
  margin-top: 8px;
  margin-bottom: 0;
`;

export const EditBtnStyled = styled.button`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 6px;
  background: transparent;
  color: ${theme.colors.blue_400};
  fill: ${theme.colors.blue_400};
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:disabled {
    cursor: not-allowed;
    background-color: transparent;
    color: ${theme.colors.gray_500};

    &:hover {
      background-color: transparent;
      color: ${theme.colors.gray_500};
      fill: ${theme.colors.gray_500};
    }
  }

  &:hover {
    background-color: ${theme.colors.blue_100};
    color: ${theme.colors.blue_500};
    fill: ${theme.colors.blue_500};
  }
`;

export const EditBtnIcon = styled.div`
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const EditBtnText = styled.span`
  margin-left: 8px;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.medium};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  gap: 1.5rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.xs};
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.medium};
  width: 200px;
  &:hover {
    color: ${theme.colors.white} !important;
  }
`;

export const StyledCancelBtn = styled(Button)`
  min-width: 8rem;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.medium};
  &:hover {
    color: ${theme.colors.black} !important;
    fill: ${theme.colors.black} !important;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
`;

export const LabelText = styled.p`
  width: 150px;
  margin-right: 20px;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-size: ${theme.fontSizes.md};
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0em;
  text-align: end;
  white-space: nowrap;
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

export const AvatarChangeBox = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  border-radius: 50%;
  overflow: hidden;
`;

export const UserPhoto = styled.img`
  width: 250px;
  height: 250px;
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

import styled from 'styled-components';
import { Button } from 'antd';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.sf_pro_text};
  font-size: 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27rem;
  gap: 1.5rem;
`;

export const InputContainer = styled.div`
  display: block;
  width: 100%;
`;

export const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.gray_300};
`;

export const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.btnGradient};
  font-family: ${({ theme }) => theme.typography.fontFamily.sf_pro_text};
  color: ${({ theme }) => theme.colors.white};
  min-width: 10rem;
  padding: 8px;
  font-size: 14px;
  font-weight: bold;
  width: 200;
`;

export const ButtonContainer = styled.div`
  display: flex;
  padding: 24px;
  justify-content: space-between;
  flex-direction: column;
  gap: 16px;
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

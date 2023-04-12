import styled from 'styled-components';
import { Button } from 'antd';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sf_pro_text};
  font-size: 12px;
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

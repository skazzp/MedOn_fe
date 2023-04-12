import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 08px;
  height: 40px;
  width: 500px;
  border-radius: 4px;
  border-color: #cccccc;
  background-color: #f4f6fd;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-family: ${theme.typography.fontFamily.sf_pro_text};
  font-size: 12px;
`;

export const Select = styled.select`
  margin-bottom: 10px;
  padding: 16px;
  height: 48px;
  width: 500px;
  border-radius: 4px;
  background-color: #f4f6fd;
`;

export const Option = styled.option``;

export const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
`;

export const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: #e6e6e6;
`;


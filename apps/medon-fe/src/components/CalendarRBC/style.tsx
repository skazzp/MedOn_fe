import { Button } from 'antd';
import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: ${(p) => p.theme.fontSizes.xxl};
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  text-align: center;
  margin-top: 25px;
  margin-bottom: 20px;
`;

export const StyledCalendar = styled(Calendar)`
  width: calc(100% - 50px);
  min-height: 600px;
  height: 65vh;
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};

  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.gray_400};
  background-color: ${(p) => p.theme.colors.gray_100};
  padding: 5px;
  .rbc-header {
    font-size: ${(p) => p.theme.fontSizes.md};
    font-weight: ${(p) => p.theme.fontWeight.medium};
    padding: 5px 10px !important;
  }

  .rbc-month-row {
    padding: 5px;
  }
  .rbc-toolbar-label {
    font-size: ${(p) => p.theme.fontSizes.lg};
    font-weight: ${(p) => p.theme.fontWeight.medium};
  }
  .rbc-event {
    text-align: center;
    background-color: ${(p) => p.theme.colors.blue_300};
  }
  button {
    font-size: ${(p) => p.theme.fontSizes.md};
  }
  .rbc-button-link {
    cursor: default;
  }
`;

export const AddTimeBox = styled.div`
  width: calc(100% - 50px);
  height: 90px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.gray_400};
  background-color: ${(p) => p.theme.colors.gray_100};
`;

export const DateText = styled.p`
  min-width: 250px;
  font-size: ${(p) => p.theme.fontSizes.lg};
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-weight: ${(p) => p.theme.fontWeight.medium};
`;

export const Text = styled.p`
  font-size: ${(p) => p.theme.fontSizes.lg};
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  font-weight: ${(p) => p.theme.fontWeight.medium};
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  gap: 10px;
`;

export const StyledButton = styled(Button)`
  min-width: 85px;
`;

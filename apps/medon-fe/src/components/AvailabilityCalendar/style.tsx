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
  .rbc-month-view {
    background-color: ${(p) => p.theme.colors.white};
  }
  .rbc-month-row {
    padding: 5px;
  }
  .rbc-toolbar {
    flex-direction: row-reverse;
  }
  .rbc-toolbar-label {
    font-size: ${(p) => p.theme.fontSizes.lg};
    font-weight: ${(p) => p.theme.fontWeight.medium};
  }
  .rbc-event {
    padding-left: 10px;
    background-color: ${(p) => p.theme.colors.blue_500};
  }
  button {
    font-size: ${(p) => p.theme.fontSizes.md};
    font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
  }
  .rbc-button-link {
    cursor: default;
  }
  .rbc-agenda-date-cell {
    border: 1px solid ${(p) => p.theme.colors.gray_400};
    background-color: ${(p) => p.theme.colors.gray_100};
  }
  .rbc-agenda-empty {
    display: block;
    width: 100%;
    text-align: center;
    padding-top: 30px;
  }

  .av-selected-day {
    background-color: ${(p) => p.theme.colors.blue_300};
  }
`;

export const AddTimeBox = styled.div`
  width: calc(100% - 50px);
  height: 90px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.gray_400};
  background-color: ${(p) => p.theme.colors.white};
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
  width: 250px;
  gap: 10px;
`;

export const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 290px;
  gap: 10px;
`;

export const StyledButton = styled(Button)`
  min-width: 90px;
`;

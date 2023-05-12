import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';

export const StyledCalendar = styled(Calendar)`
  width: calc(100% - 50px);
  height: 600px;
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
    color: red;
  }
  .rbc-toolbar {
    flex-direction: row-reverse;
    color: ${(p) => p.theme.colors.blue_500};
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
    color: ${(p) => p.theme.colors.gray_700};
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
`;

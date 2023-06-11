import { Select } from 'antd';
import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';

import { ReactComponent as InfoIcon } from 'assets/images/dashboard/User.svg';

import { Icon } from 'components/AppointmentsScore/styles';

import { StyledDivProps } from 'pages/AppointmentsPage/types';

import { theme } from 'styles/theme';

export const Container = styled.div`
  font-family: ${theme.fontFamily.sf_pro_text};
  width: 100%;
  padding: 3rem;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledSelect = styled(Select)`
  width: 100px;
  .ant-select-selector {
    font-family: ${theme.fontFamily.sf_pro_text};
    font-size: ${theme.fontSizes.md};
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  span {
    color: ${theme.colors.blue_500};
  }
  h2 {
    font-size: ${theme.fontSizes.xxl};
  }
`;

export const CountText = styled.span`
  margin-left: 5px;
`;

export const View = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray_300};
  overflow: hidden;

  &:last-child {
    border-right: none;
  }
`;

export const ViewItem = styled.div<StyledDivProps>`
  text-align: center;
  border-right: 1px solid ${theme.colors.gray_300};
  flex-grow: 1;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: ${(props) =>
    props.isActive ? theme.colors.gray_200 : theme.colors.white};
`;

export const StyledCalendar = styled(Calendar)`
  width: 100%;
  min-height: 600px;
  height: 65vh;
  font-family: ${theme.fontFamily.sf_pro_text};

  border-radius: 8px;
  border: 1px solid ${theme.colors.gray_400};
  background-color: ${theme.colors.gray_100};
  padding: 5px;

  .rbc-header {
    font-size: ${theme.fontSizes.md};
    font-weight: ${theme.fontWeight.medium};
    padding: 5px 10px !important;
  }
  .rbc-month-view {
    background-color: ${theme.colors.white};
  }
  .rbc-toolbar {
    flex-direction: row-reverse;
  }
  .rbc-toolbar-label {
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeight.medium};
  }
  .rbc-event {
    padding-left: 10px;
    background-color: ${theme.colors.blue_500};
  }
  button {
    font-size: ${theme.fontSizes.md};
    font-family: ${theme.fontFamily.sf_pro_text};
  }
  .rbc-button-link {
    cursor: default;
  }
  .rbc-agenda-date-cell {
    border: 1px solid ${theme.colors.gray_400};
    background-color: ${theme.colors.gray_100};
  }
  .rbc-agenda-empty {
    display: block;
    width: 100%;
    text-align: center;
    padding-top: 30px;
  }

  .av-selected-day {
    background-color: ${theme.colors.blue_300};
  }
`;

export const AppointmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  gap: 1rem;
  margin-bottom: 3rem;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  > button {
    margin: 0 auto;
    border: 2px solid ${theme.colors.blue_400};
  }
`;

export const Buttons = styled.div`
  display: flex;
  > button {
    padding: 0.5rem 1rem;
    border: 1px solid ${theme.colors.gray_300};
    border-radius: 0;
    transition: all 0.2s ease-in-out;
    outline: transparent;
    font-weight: 400;

    &:first-child {
      border-radius: 8px 0 0 8px;
    }
    &:last-child {
      border-radius: 0 8px 8px 0;
    }
    &:focus {
      background-color: ${theme.colors.gray_200};
      transition: all 0.2s ease-in-out;
    }
  }
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NotFound = styled.h3`
  display: flex;
  justify-content: center;
  width: calc(100% - 2rem);
  padding: 5rem 0;
  color: ${theme.colors.blue_500};
  font-size: ${theme.fontSizes.xxl};
`;

export const UserIcon = styled(Icon).attrs(() => ({
  children: <InfoIcon />,
}))``;

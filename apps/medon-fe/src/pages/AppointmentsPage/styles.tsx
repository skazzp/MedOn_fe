import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Icon } from 'components/AppointmentsScore/styles';
import { ReactComponent as InfoIcon } from 'assets/images/dashboard/User.svg';
import { StyledDivProps } from 'pages/AppointmentsPage/types';
import { Calendar } from 'react-big-calendar';

export const Container = styled.div`
  font-family: ${theme.fontFamily.sf_pro_text};
  flex-grow: 1;
  padding: 40px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;

export const View = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray_300};
  overflow: hidden;

  &:last-child {
    border-right: none;
  }
`;

export const ViewItem = styled.div<StyledDivProps>`
  text-align: center;
  border-right: 1px solid ${({ theme }) => theme.colors.gray_300};
  flex-grow: 1;
  padding: 10px;
  cursor: pointer;
  background: ${(props) =>
    props.isActive ? theme.colors.gray_200 : theme.colors.white};
`;

export const UserIcon = styled(Icon).attrs(() => ({
  children: <InfoIcon />,
}))``;

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

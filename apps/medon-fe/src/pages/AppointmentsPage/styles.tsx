import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Icon } from 'components/AppointmentsScore/styles';
import { ReactComponent as InfoIcon } from 'assets/images/dashboard/User.svg';
import { ReactComponent as Profile } from 'assets/svgs/profile_listcard.svg';
import { StyledDivProps } from 'pages/AppointmentsPage/types';
import { Calendar } from 'react-big-calendar';
import { Modal } from 'antd';

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
  span {
    color: ${theme.colors.blue_500};
  }
`;

export const View = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  border-radius: 6px;
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

export const StyledModal = styled(Modal)`
  .ant-modal-header {
    border-bottom: none;
    padding: 1rem 0;

    .ant-modal-title {
      font-size: ${theme.fontSizes.xxl};
      color: ${theme.colors.black};
    }
  }
  .ant-modal-footer {
    padding: 1rem 0;
  }
  .ant-modal-footer button {
    align-items: center;
    border: none;
    border-radius: 4px;
    padding: 0 2rem;
    &:first-child {
      background-color: ${theme.colors.gray_300};
      color: ${theme.colors.black};
      &:hover {
        background-color: ${theme.colors.gray_500};
      }
    }
    &:last-child {
      background-color: ${theme.colors.blue_500};
      color: ${theme.colors.white};
      &:hover {
        background-color: ${theme.colors.blue_300};
      }
    }
  }
`;

export const ProfileIcon = styled(Profile)`
  display: flex;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  &:hover {
    filter: brightness(1.2);
  }
`;

export const Details = styled.div`
  span {
    font-weight: ${theme.fontWeight.bold};
  }
  p {
    margin-top: 2px;
    font-weight: ${theme.fontWeight.medium};
  }
`;

export const Entity = styled.div`
  display: flex;
  gap: 4px;
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

export const NotAppointment = styled.h4`
  display: flex;
  font-size: ${theme.fontSizes.xxl};
  color: ${theme.colors.blue_500};
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
`;

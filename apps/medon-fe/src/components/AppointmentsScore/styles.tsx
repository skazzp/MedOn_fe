import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ReactComponent as InfoIcon } from 'assets/images/dashboard/User.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/navigation/Calendar.svg';
import { Link } from 'react-router-dom';

export const CountList = styled.div`
  display: flex;
  grid-gap: 5px;
  align-items: center;
  p {
    color: ${theme.colors.lightBlue};
  }
`;

export const Appointments = styled.div`
  display: flex;
  grid-gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.div`
  margin-left: 16px;
  svg {
    fill: ${theme.colors.lightBlue};
  }
`;

export const IconBtn = styled.div`
  margin-left: 6px;
  display: flex;
  svg {
    fill: ${theme.colors.white};
  }
`;

export const Radio = styled.div`
  border: 1px solid ${theme.colors.grayBorder};
  display: flex;
  border-radius: 4px;
  cursor: pointer;

  input[type='radio'] {
    display: none;
  }

  label {
    padding: 10px;
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    background-color: ${theme.colors.gray_200};
  }
`;

export const Availability = styled(Link)`
  background: ${theme.colors.btnGradient};
  border-radius: 4px;
  align-items: center;
  padding: 8px 12px;
  display: flex;
  color: ${theme.colors.white};
  text-decoration: none;
  position: relative;
  transition: background-color 1s;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.black};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 250ms;
    opacity: 0.1;
  }
  span {
    color: #fff;
    transition: opacity 250ms;
    opacity: 0;
  }
  &:hover {
    background-color: ${theme.colors.black};
    &:before {
      transform: scaleY(1);
    }
    span {
      opacity: 1;
    }
  }
`;

export const UserIcon = styled(Icon).attrs(() => ({
  children: <InfoIcon />,
}))``;

export const IconCalendar = styled(IconBtn).attrs(() => ({
  children: <CalendarIcon />,
}))``;

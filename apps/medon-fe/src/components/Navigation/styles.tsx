import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as DashboardIcon } from 'assets/images/navigation/Elements.svg';
import { ReactComponent as BriefcaseIcon } from 'assets/images/navigation/Briefcase.svg';
import { ReactComponent as ProfileIcon } from 'assets/images/navigation/User_Circle.svg';
import { ReactComponent as PatientIcon } from 'assets/images/navigation/Users.svg';
import { ReactComponent as HelpIcon } from 'assets/images/navigation/Question.svg';
import { ReactComponent as LogoutIcon } from 'assets/images/navigation/Sign_Out.svg';
import { ReactComponent as AvailabilityIcon } from 'assets/images/navigation/Calendar.svg';

import { theme } from 'styles/theme';

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: ${theme.colors.background_navi};
`;

export const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: ${theme.colors.navi_text};
  font-family: ${theme.fontFamily.roboto};
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 10px;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.7s;

  &.active {
    background-color: ${theme.colors.navi_hover};
    color: ${theme.colors.icon_active};
  }

  &.active svg {
    fill: ${theme.colors.icon_active};
  }

  &:hover {
    background-color: ${theme.colors.navi_hover};
    color: ${theme.colors.icon_active};
  }
  &:hover svg {
    fill: ${theme.colors.icon_active};
  }
`;

export const Icon = styled.div`
  margin-right: 16px;
  svg {
    fill: ${theme.colors.icon_common};
  }
`;

export const HeaderBlock = styled.header`
  width: 100%;
`;

export const Ul = styled.ul`
  list-style-type: none;
  padding: 0 20px 0 25px;
  li {
    display: flex;
    align-items: center;
    div {
      display: flex;
    }
  }
`;

export const UserBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  border-top: 1px solid ${theme.colors.gray_400};
  padding: 25px 0 0 25px;
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const UserName = styled.span`
  font-size: ${theme.fontSizes.md};
  font-weight: 500;
  color: ${theme.colors.black};
  font-family: ${theme.fontFamily.sf_pro_text};
`;

export const SpecName = styled.span`
  font-size: ${theme.fontSizes.sm};
  font-weight: 400;
  color: ${theme.colors.speciality};
  font-family: ${theme.fontFamily.sf_pro_text};
`;

export const BlockName = styled.span`
  display: flex;
  flex-direction: column;
`;

export const Dashboard = styled(Icon).attrs(() => ({
  children: <DashboardIcon />,
}))``;

export const Briefcase = styled(Icon).attrs(() => ({
  children: <BriefcaseIcon />,
}))``;

export const Profile = styled(Icon).attrs(() => ({
  children: <ProfileIcon />,
}))``;

export const Patient = styled(Icon).attrs(() => ({
  children: <PatientIcon />,
}))``;

export const Help = styled(Icon).attrs(() => ({
  children: <HelpIcon />,
}))``;

export const Logout = styled(Icon).attrs(() => ({
  children: <LogoutIcon />,
}))``;

export const Availability = styled(Icon).attrs(() => ({
  children: <AvailabilityIcon />,
}))``;

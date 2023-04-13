import { Link } from 'react-router-dom';

import { theme } from 'styles/theme';
import styled from 'styled-components';
import { ReactComponent as DashboardIcon } from 'assets/images/navigation/Elements.svg';
import { ReactComponent as BriefcaseIcon } from 'assets/images/navigation/Briefcase.svg';
import { ReactComponent as ProfileIcon } from 'assets/images/navigation/User_Circle.svg';
import { ReactComponent as PatientIcon } from 'assets/images/navigation/Users.svg';
import { ReactComponent as HelpIcon } from 'assets/images/navigation/Question.svg';
import { ReactComponent as LogoutIcon } from 'assets/images/navigation/Sign_Out.svg';


export const Links = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.navi_text};
  font-family: ${theme.fontFamily.roboto};
  font-weight: 700;
      &:hover {
        color: ${theme.colors.icon_active};
      }
`


export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 250px;
  `;

export const Icon = styled.div`
    fill: ${theme.colors.icon_common};
    margin-right: 16px;
`

export const HeaderBlock = styled.header`
    width: 100%;
    background-color: ${theme.colors.background_navi};
  `;

export const Ul = styled.ul`
  list-style-type: none;
  padding: 0 0 0 25px;
  li {
    padding: 10px 15px 10px 10px;
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    transition: all .7s;
    img {
      margin-right: 16px;
    }
    &:hover {
      background-color: ${theme.colors.navi_hover};
    }
  }
`;

export const UserBlock = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 175px;
  margin-top: 175px;
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
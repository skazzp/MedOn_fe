import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Arrow } from 'assets/svgs/arrow/left-arrow.svg';
import {
  Location,
  Phone,
  Mail,
  MaleSex,
  Age,
  FemaleSex,
} from 'assets/svgs/patientCard/index';
import { theme } from 'styles/theme';

export const Container = styled.div`
  padding: 25px 0;
  p {
    margin: 0 15px 0 0;
  }
`;

export const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${theme.colors.icon_active};
  position: relative;
  font-weight: ${theme.fontWeight.bold};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.icon_active};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease-out;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

export const Patient = styled.div`
  font-family: ${theme.fontFamily.sf_pro_text};
  font-style: normal;
  margin-top: 25px;
`;

export const Names = styled.div`
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.xxl};
  color: ${theme.colors.black};
  margin-bottom: 10px;
`;

export const MainInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
  a {
    color: ${theme.colors.icon_active};
    text-decoration: none;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: ${theme.colors.icon_active};
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.5s ease-out;
    }

    &:hover::before {
      transform: scaleX(1);
    }
  }
`;

export const SupplementaryInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Icon = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
  svg {
    fill: ${theme.colors.icon_common};
  }
`;

export const LeftArrow = styled(Icon).attrs(() => ({
  children: <Arrow />,
}))``;

export const PhoneIcon = styled(Icon).attrs(() => ({
  children: <Phone />,
}))``;

export const MailIcon = styled(Icon).attrs(() => ({
  children: <Mail />,
}))``;

export const MaleIcon = styled(Icon).attrs(() => ({
  children: <MaleSex />,
}))``;

export const NoteIcon = styled(Icon).attrs(() => ({
  children: <Age />,
}))``;

export const LocationIcon = styled(Icon).attrs(() => ({
  children: <Location />,
}))``;

export const FemaleIcon = styled(Icon).attrs(() => ({
  children: <FemaleSex />,
}))``;

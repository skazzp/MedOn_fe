import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ReactComponent as InfoIcon } from 'assets/images/dashboard/User.svg';
import { ReactComponent as UnionIcon } from 'assets/images/dashboard/Union.svg';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: calc(100% - 100px);
  margin: 0 auto;
  height: 100%;
`;

export const Score = styled.div`
  display: flex;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.xxl};
  font-family: ${theme.fontFamily.sf_pro_text};
  line-height: 26px;
  div {
    margin-left: 15px;
    display: flex;
    background-color: ${theme.colors.grayBack};
    border-radius: 8px;
  }
  span {
    font-weight: ${theme.fontWeight.medium};
    font-size: ${theme.fontSizes.xl};
    padding-right: 15px;
    color: ${theme.colors.gray_500};
    padding-left: 10px;
  }
`;

export const Icon = styled.div`
  margin-left: 16px;
  svg {
    fill: ${theme.colors.gray_500};
  }
`;
export const IconUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 150px;
  grid-column-start: 2;
  grid-row-start: 2;
  height: 200px;
  svg {
    fill: ${theme.colors.gray_500};
    width: 200px;
    height: 200px;
  }
`;

export const IconBlue = styled.div`
  margin-left: 16px;
  svg {
    fill: ${theme.colors.icon_active};
  }
`;

export const Block = styled.div`
  border: 2px solid ${theme.colors.grayBorder};
  border-radius: 8px;
  height: 75vh;
  margin-top: 50px;
  position: relative;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  height: 100%;
`;

export const Manage = styled(Link)`
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.xl};
  font-family: ${theme.fontFamily.sf_pro_text};
  line-height: 20px;
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: ${theme.colors.icon_active};
`;

export const TextWrap = styled.div`
  grid-column-start: 2;
  grid-row-start: 3;
`;

export const UserIcon = styled(Icon).attrs(() => ({
  children: <InfoIcon />,
}))``;

export const IconUnion = styled(IconBlue).attrs(() => ({
  children: <UnionIcon />,
}))``;

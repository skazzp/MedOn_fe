/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { cross, smallArrowRight, union } from 'utils/constants';
import { steps } from 'utils/constants/steps';
import { ButtonProps } from './types';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
export const StepsScore = styled.div`
  font-family: ${theme.fontFamily.sf_pro_text};
  font-style: normal;
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSizes.md};
  line-height: 24px;
  color: ${theme.colors.gray_700};
`;

export const Cancel = styled.button`
  border: 1px solid ${theme.colors.gray_500};
  border-radius: 4px;
  background: ${theme.colors.blue_300};
  padding: 8px 14px 8px 25px;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-style: normal;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.md};
  line-height: 20px;
  color: ${theme.colors.white};
  background-image: url(${cross});
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 5px;
  transition: all 0.7s;
  :hover {
    background: ${theme.colors.blue_700};
    background-image: url(${cross});
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 5px;
  }
  &[disabled] {
    background: ${theme.colors.gray_500};
  }
`;

export const Selected = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50px;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.colors.gray_500};
`;

export const Button = styled.button<ButtonProps>`
  position: absolute;
  bottom: 20px;
  ${(props) => props.position && `right: ${props.position}px;`}
  background: ${theme.colors.blue_300};
  background-repeat: no-repeat;
  background-position-y: center;
  transition: all 0.5s;
  border: 1px solid ${theme.colors.white};
  border-radius: 4px;
  padding: 8px;
  font-family: ${theme.fontFamily.sf_pro_text};
  font-style: normal;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.md};
  line-height: 20px;
  color: ${theme.colors.white};
  &:hover {
    background-color: ${theme.colors.blue_700};
    background-position-x: ${({ buttonType }) =>
      buttonType === steps.next
        ? '90px'
        : buttonType === steps.previous
        ? '5px'
        : '155px'};
  }

  ${(props) =>
    props.buttonType === steps.next &&
    `
    background-image: url(${smallArrowRight});
    background-position-x: 85px;
    padding-right: 30px;
      &[disabled] {
    background: ${theme.colors.gray_500};
  }
  `}
  ${(props) =>
    props.buttonType === steps.previous &&
    `
    background-image: url(${union});
    background-position-x: 10px;
    padding-left: 35px;
  `}
  ${(props) =>
    props.buttonType === steps.booking &&
    `
    background-position-x: 155px;
    padding-right: 24px;
    font-size: 14px;
  `}
`;

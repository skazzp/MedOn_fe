import { Modal } from 'antd';
import styled from 'styled-components';

import { ReactComponent as Profile } from 'assets/svgs/profile_listcard.svg';

import { theme } from 'styles/theme';

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

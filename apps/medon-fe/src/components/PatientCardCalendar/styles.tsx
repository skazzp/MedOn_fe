import { Modal } from 'antd';
import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';

export const StyledCalendar = styled(Calendar)`
  width: calc(100% - 50px);
  height: 40rem;
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};

  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.gray_400};
  background-color: ${(p) => p.theme.colors.gray_100};
  padding: 5px;
  .rbc-show-more {
    color: ${(p) => p.theme.colors.blue_500};
    cursor: pointer;
    font-size: ${(p) => p.theme.fontSizes.md};
    font-weight: ${(p) => p.theme.fontWeight.medium};
    &:hover {
      color: ${(p) => p.theme.colors.blue_300};
      text-decoration: underline;
    }
  }

  .rbc-header {
    font-size: ${(p) => p.theme.fontSizes.md};
    font-weight: ${(p) => p.theme.fontWeight.medium};
    padding: 5px 10px !important;
  }
  .rbc-month-view {
    background-color: ${(p) => p.theme.colors.white};
  }
  .rbc-month-row {
    padding: 5px;
  }
  .rbc-toolbar {
    flex-direction: row-reverse;
    color: ${(p) => p.theme.colors.blue_500};
  }
  .rbc-toolbar-label {
    font-size: ${(p) => p.theme.fontSizes.lg};
    font-weight: ${(p) => p.theme.fontWeight.medium};
  }
  .rbc-event {
    background-color: ${(p) => p.theme.colors.blue_500};
    border: none;
  }
  .rbc-events-container {
    margin: 0;
    gap: 1rem;
  }
  button {
    font-size: ${(p) => p.theme.fontSizes.md};
    font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
    color: ${(p) => p.theme.colors.gray_700};
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
`;

export const StyledModal = styled(Modal)`
  .ant-modal-header {
    border-bottom: none;
    padding: 1rem 0;

    .ant-modal-title {
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      color: ${({ theme }) => theme.colors.black};
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
      background-color: ${({ theme }) => theme.colors.gray_300};
      color: ${({ theme }) => theme.colors.black};
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray_500};
      }
    }
    &:last-child {
      background-color: ${({ theme }) => theme.colors.blue_500};
      color: ${({ theme }) => theme.colors.white};
      &:hover {
        background-color: ${({ theme }) => theme.colors.blue_300};
      }
    }
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a {
    display: flex;
    white-space: nowrap;
    gap: 0.5rem;
  }
`;

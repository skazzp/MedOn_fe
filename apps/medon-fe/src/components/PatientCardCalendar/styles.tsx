import { Modal, Select } from 'antd';
import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';

export const StyledCalendar = styled(Calendar)`
  width: 100%;
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
    font-weight: ${(p) => p.theme.fontWeight.bold};
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
  .rbc-time-content {
    display: none;
    visibility: hidden;
  }
  .rbc-time-header {
    min-height: 150px;
  }
  .rbc-time-header-gutter {
    display: none;
    visibility: hidden;
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

export const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const AddNoteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  overflow: hidden;
  transition: height 1s ease-in-out;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  > button:first-child {
    padding: 0 5rem;
  }
  > button:last-child {
    svg {
      fill: ${({ theme }) => theme.colors.gray_700};
    }
  }
`;

export const StyledSelect = styled(Select)`
  width: 300px;
`;

export const Dot = styled.div<{ color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background-color: ${({ color }) => color};
`;

export const Legend = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-bottom: 1rem;
  > legend {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TextSubtitle = styled.legend`
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

export const MedicalTitle = styled.h5`
  width: 100%;
`;

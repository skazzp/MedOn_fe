import { Select } from 'antd';
import styled from 'styled-components';
import { Calendar } from 'react-big-calendar';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  > button {
    border: 1px solid ${({ theme }) => theme.colors.blue_500};
    padding: 1rem 0;
  }
  > h4 {
    margin: 0;
    padding: 0;
  }
  > span {
    display: flex;
    padding: 2rem 0;
    justify-content: center;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  > h5 {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.icon_active};
    text-align: center;
    border-top: 2px solid ${({ theme }) => theme.colors.gray_300};
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray_300};
    padding: 1rem 0;
    margin: auto;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const StyledSelect = styled(Select)`
  width: 300px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a:last-child {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.blue_300};
    text-decoration: none;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    gap: 0.5rem;
  }
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
  > button:first-child {
    padding: 0 5rem;
  }
  > button:last-child {
    svg {
      fill: ${({ theme }) => theme.colors.gray_700};
    }
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StyledCalendar = styled(Calendar)`
  width: calc(100% - 50px);
  height: 400px;
  font-family: ${(p) => p.theme.fontFamily.sf_pro_text};

  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.gray_400};
  background-color: ${(p) => p.theme.colors.gray_100};
  padding: 5px;
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
  }
  .rbc-toolbar-label {
    font-size: ${(p) => p.theme.fontSizes.lg};
    font-weight: ${(p) => p.theme.fontWeight.medium};
  }
  .rbc-event {
    padding-left: 10px;
    background-color: ${(p) => p.theme.colors.blue_300};
  }
  button {
    font-size: ${(p) => p.theme.fontSizes.md};
    font-family: ${(p) => p.theme.fontFamily.sf_pro_text};
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

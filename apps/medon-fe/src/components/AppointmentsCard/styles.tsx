import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';

import { IAppointmentsCardProps } from './types';

export const Container = styled.div<IAppointmentsCardProps>`
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  background-color: ${({ theme, isLinkAdded }) =>
    isLinkAdded ? theme.colors.blue_200 : theme.colors.white};
  border: 2px solid
    ${({ theme, isLinkAdded }) =>
      isLinkAdded ? theme.colors.blue_250 : theme.colors.gray_300};
  padding: 0.875rem 0.75rem;
  border-radius: 0.5rem;
  > div:first-child {
    padding-bottom: 0.5rem;
  }
  > div:last-child {
    strong {
      color: ${({ theme }) => theme.colors.blue_900};
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray_300};
  flex-wrap: wrap;
  > button {
    width: fit-content;
    height: fit-content;
    padding: 0.25rem 0.5rem;
  }
`;

export const Number = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Info = styled.span`
  display: flex;
  gap: 2.5rem;
  width: 17rem;
  white-space: nowrap;
`;

export const RemoteAssign = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  > strong {
    color: ${({ theme }) => theme.colors.blue_300};
  }
`;

export const Patient = styled.span`
  display: flex;
  gap: 0.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Name = styled.span`
  color: ${({ theme }) => theme.colors.blue_300};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
`;

export const Time = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  > svg {
    margin-bottom: 0.1rem;
    margin-right: 0.3rem;
  }
`;

export const TrashBin = styled(DeleteOutlined)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue_400};
  font-size: 1.25rem;
`;

export const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  > a {
    height: 1.5rem;
  }
`;

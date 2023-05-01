import styled from 'styled-components';

import { ReactComponent as Profile } from 'assets/svgs/profile_listcard.svg';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray_300};
  border-radius: 0.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5rem;
  padding: 0.5rem 0;
`;

export const Text = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  & > span:first-child {
    color: ${({ theme }) => theme.colors.blue_500};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 700;
  }
  & > span:last-child {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 500;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
`;

export const ProfileIcon = styled(Profile)`
  display: flex;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  &:hover {
    filter: brightness(1.2);
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_300};
`;

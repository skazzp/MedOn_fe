import styled from 'styled-components';

import { ReactComponent as Profile } from 'assets/svgs/profile_listcard.svg';
import { ReactComponent as Camera } from 'assets/images/Camera.svg';

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
  div {
    display: flex;
    align-items: center;
    margin-left: 20vw;
  }
  p {
    margin: 0 10px 0 0;
  }
  span {
    color: ${({ theme }) => theme.colors.blue_500};
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
`;

export const CameraIcon = styled(Camera)`
  margin-right: 10px;
`;

export const remoteDoc = styled.div`
  display: flex;
  align-items: center;
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
  border-top: 1px solid ${({ theme }) => theme.colors.gray_300};
  > p {
    line-height: 1.5;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
  > button {
    background-color: transparent;
    border: transparent;
    text-align: left;
    margin-top: -0.5rem;
    margin-bottom: 0.5rem;
    padding: 0;
    color: ${({ theme }) => theme.colors.blue_500};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    cursor: pointer;
  }
`;

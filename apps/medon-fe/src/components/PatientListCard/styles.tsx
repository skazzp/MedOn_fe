import styled from 'styled-components';

import { ReactComponent as Profile } from 'assets/svgs/profile_listcard.svg';
import { ReactComponent as Camera } from 'assets/images/Camera.svg';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.blue_250};
  background: ${({ theme }) => theme.colors.blue_200};
  border-radius: 0.5rem;
  min-height: 100px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 3rem;
  padding: 0.5rem 0;
`;

export const Text = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  & > span:last-child {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.md};
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

  a {
    text-decoration: none;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.blue_500};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const GenderText = styled.span`
  color: ${({ theme }) => theme.colors.black};
  text-transform: capitalize;
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
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_300};
  word-break: break-word;
`;

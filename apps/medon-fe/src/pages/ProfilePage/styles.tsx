import styled from 'styled-components';

export const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProfileFormWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_main};
  padding: 40px;
`;

import styled from 'styled-components';

export const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProfileFormWrapper = styled.div`
  display: flex;
  /* flex: 1; */
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BACKGROUND_PRIMARY};
  padding: 40px;
`;

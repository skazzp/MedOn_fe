import styled from 'styled-components';

export const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ProfileFormWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_main};
  padding: 40px;
`;

import styled from 'styled-components';
import { AUTH_PICTURE } from 'utils/constants/urls';

export const Sidebar = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${AUTH_PICTURE});
`;

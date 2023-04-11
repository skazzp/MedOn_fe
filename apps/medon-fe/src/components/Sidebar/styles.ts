import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 200px;
  height: 100%;
  background-color: #E2EDFD;
  position: fixed;
  top: 0;
  left: 0;
`;

export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const MenuItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;
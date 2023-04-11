import { MenuItem, MenuList, SidebarContainer } from './styles';

export default function Sidebar() {
  return (
    <SidebarContainer>
      <MenuList>
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
      </MenuList>
    </SidebarContainer>
  );
}

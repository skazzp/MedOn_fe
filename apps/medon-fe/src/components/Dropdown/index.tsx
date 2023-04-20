import { Dropdown } from 'antd';
import { items } from 'utils/constants/optionsMenuDropdown';
import { StyledThreeDots } from './styles';

const DropdownMenu = () => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <StyledThreeDots />
  </Dropdown>
);

export default DropdownMenu;

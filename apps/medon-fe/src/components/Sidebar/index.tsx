import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { CalendarOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { AppSideMenuContainer } from './styles';

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC = () => {
  // const navigate = useNavigate();
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Dashboard', '1', <MailOutlined />),
    getItem('Appointments', '2', <CalendarOutlined />),
    getItem('Profile', '3', <CalendarOutlined />),
    getItem('Patient list', '4', <CalendarOutlined />),
    getItem('Help', '5', <CalendarOutlined />),
    getItem('Logout', '6', <CalendarOutlined />),
  ];

  return (
    <AppSideMenuContainer>
      <Menu
        style={{
          height: '100vh',
          width: 250,
          backgroundColor: '#E2EDFD',
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        items={items}
        // onClick={({ key }) => {
        //   navigate(key);
        // }}
      />
    </AppSideMenuContainer>
  );
};

export default Sidebar;

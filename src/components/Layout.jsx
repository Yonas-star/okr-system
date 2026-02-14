import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Avatar, Dropdown, theme, Space, Badge } from 'antd';
import { 
  DashboardOutlined, 
  AppstoreOutlined,
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GlobalOutlined,
  FileTextOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
  FlagOutlined,
  BarChartOutlined,
  RocketOutlined,
  AimOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = AntLayout;

const Layout = ({ setIsAuthenticated }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  // Organization Menu Items
  const organizationItems = [
    {
      key: 'org-mission',
      icon: <RocketOutlined />,
      label: 'Mission & Vision',
      onClick: () => navigate('/organization/mission'),
    },
    {
      key: 'org-report',
      icon: <FileTextOutlined />,
      label: "Director's Report",
      onClick: () => navigate('/organization/report'),
    },
  ];

  // Directorate Menu Items
  const directorateItems = [
    {
      key: 'director-page',
      icon: <UserOutlined />,
      label: "Director's Dashboard",
      onClick: () => navigate('/directorates/director'),
    },
  ];

  // Division Menu Items
  const divisionItems = [
    {
      key: 'division-head',
      icon: <TeamOutlined />,
      label: 'Division Head',
      onClick: () => navigate('/divisions/head'),
    },
  ];

  // Employee Menu Items
  const employeeItems = [
    {
      key: 'employee',
      icon: <SolutionOutlined />,
      label: 'Employee Dashboard',
      onClick: () => navigate('/employee'),
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  // Get page title based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('mission')) return 'Mission & Vision';
    if (path.includes('report')) return "Director's Report";
    if (path.includes('director')) return "Director's Dashboard";
    if (path.includes('division')) return 'Division Head Dashboard';
    if (path.includes('employee')) return 'Employee Dashboard';
    if (path.includes('dashboard')) return 'Main Dashboard';
    return 'OKR System';
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        style={{ 
          boxShadow: '2px 0 8px 0 rgba(29,35,41,0.05)',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          overflowY: 'auto'
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          borderBottom: '1px solid #f0f0f0' 
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: collapsed ? 16 : 20, 
            color: '#1890ff',
            whiteSpace: 'nowrap'
          }}>
            {collapsed ? 'OKR' : 'OKR System'}
          </h1>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split('/')[2] || 'dashboard']}
          style={{ borderRight: 'none', marginTop: 8 }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />} onClick={() => navigate('/dashboard')}>
            Main Dashboard
          </Menu.Item>

          <Menu.Divider />
          <Menu.ItemGroup title="ORGANIZATION">
            {organizationItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>

          <Menu.Divider />
          <Menu.ItemGroup title="DIRECTORATES">
            {directorateItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>

          <Menu.Divider />
          <Menu.ItemGroup title="DIVISIONS">
            {divisionItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>

          <Menu.Divider />
          <Menu.ItemGroup title="EMPLOYEES">
            {employeeItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </Menu>
      </Sider>

      <AntLayout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          position: 'sticky',
          top: 0,
          zIndex: 99
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
              style: { fontSize: 18, cursor: 'pointer' }
            })}
            <span style={{ fontSize: 18, fontWeight: 500 }}>
              {getPageTitle()}
            </span>
          </div>
          <Space size={20}>
            <Badge count={5} size="small">
              <BellOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>John Director</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          background: colorBgContainer, 
          minHeight: 280,
          borderRadius: 8
        }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
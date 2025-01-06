import { useState, useEffect } from 'react';
import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import MenuList from './components/common/sidebar/MenuList';
import ToggleThemeButton from './components/common/sidebar/ToggleThemeButton';
import { Header } from 'antd/es/layout/layout';
import AppRoutes from './routes.jsx';
import logo from '/assets/images/logo.jpg';
import 'antd/dist/reset.css';
import axios from 'axios';
const { Sider } = Layout;

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'guest');
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // CSRF cookie setup
  useEffect(() => {
    const setCsrfCookie = async () => {
      try {
        await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
          withCredentials: true,
        });
        console.log('CSRF cookie set');
      } catch (error) {
        console.error('Error setting CSRF cookie:', error);
      }
    };

    setCsrfCookie();
  }, []); // Runs once when the component mounts

  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem('userRole') || 'guest';
      setUserRole(role);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <LayoutWithSidebar
        darkTheme={darkTheme}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        toggleTheme={toggleTheme}
        colorBgContainer={colorBgContainer}
        logo={logo}
        userRole={userRole}
      />
    </Router>
  );
};

const LayoutWithSidebar = ({ darkTheme, setCollapsed, collapsed, toggleTheme, colorBgContainer, logo, userRole }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/emp_login';

  return (
    <Layout>
      {!isAuthPage && (
        <Sider collapsed={collapsed} collapsible trigger={null} className="sidebar" theme={darkTheme ? 'dark' : 'light'}>
          <MenuList darkTheme={darkTheme} userRole={userRole} />
          <ToggleThemeButton darkTheme={darkTheme} ToggleTheme={toggleTheme} />
        </Sider>
      )}
      <Layout>
        {!isAuthPage && (
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img src={logo} alt="App Logo" style={{ height: '40px', margin: '0 16px' }} />
            <Button
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Header>
        )}
        <Layout.Content style={{ padding: '0 24px', minHeight: 'calc(100vh - 64px)' }}>
          <AppRoutes />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;

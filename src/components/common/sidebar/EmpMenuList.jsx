import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UsergroupAddOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../../../styles/global.css';

const EmpMenuList = ({ darkTheme, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      setUserRole(null);
      navigate('/emp_login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const employeeItems = [
    {
      key: 'crm-menu',
      icon: <UsergroupAddOutlined />,
      label: 'CRM',
      children: [
        { key: 'lead', label: <Link to="/emp_lead">Leads</Link> },
        { key: 'follow-up', label: <Link to="/follow-up">Lead F/U</Link> },
      ],
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const getSelectedKeys = () => {
    return employeeItems.reduce((acc, item) => {
      if (item.label?.props?.to === currentPath) {
        acc.push(item.key);
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.label?.props?.to && (currentPath === child.label.props.to || currentPath.startsWith(child.label.props.to))) {
            acc.push(item.key, child.key);
          }
        });
      }
      return acc;
    }, []);
  };

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      mode="inline"
      className="menu-bar"
      selectedKeys={getSelectedKeys()}
      items={employeeItems}
      collapsed={collapsed}
    />
  );
};

EmpMenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default EmpMenuList;

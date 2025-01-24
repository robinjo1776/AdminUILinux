import { useMemo } from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  BarsOutlined,
  DollarCircleOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
  PayCircleOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../../../styles/global.css';

const MenuList = ({ darkTheme, userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const employeeItems = [
    {
      key: 'crm-menu',
      icon: <UsergroupAddOutlined />,
      label: 'CRM',
      children: [
        { key: 'lead', label: <Link to="/lead">Leads</Link> },
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

  const adminItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/dashboard">Home</Link>,
    },
    {
      key: 'orders-menu',
      icon: <BarsOutlined />,
      label: 'Orders',
      children: [
        { key: 'orders', label: <Link to="/order">Orders</Link> },
        { key: 'dispatch', label: <Link to="/dispatch-list">Dispatch</Link> },
        { key: 'tracing', label: <Link to="/tracing">Tracing</Link> },
        {
          key: 'rate-history',
          label: <Link to="/rate-history">Rate Hist.</Link>,
        },
      ],
    },
    {
      key: 'sales-quotes-menu',
      icon: <DollarCircleOutlined />,
      label: 'Quotes',
      children: [
        { key: 'shipment', label: <Link to="/shipment">Quotes</Link> },
        {
          key: 'quotes-leads',
          label: <Link to="/quotes-lead">Leads with Quotes</Link>,
        },
      ],
    },
    {
      key: 'crm-menu',
      icon: <UsergroupAddOutlined />,
      label: 'CRM',
      children: [
        { key: 'lead', label: <Link to="/lead">Leads</Link> },
        { key: 'follow-up', label: <Link to="/follow-up">Lead F/U</Link> },
      ],
    },
    {
      key: 'customers-menu',
      icon: <FileTextOutlined />,
      label: <Link to="/customer">Customers</Link>,
    },
    {
      key: 'reports-menu',
      icon: <FileDoneOutlined />,
      label: 'Reports',
      children: [
        {
          key: 'employee-login',
          label: <Link to="/employee-login">Emp. Login</Link>,
        },
        {
          key: 'export-invoice-data',
          label: <Link to="/export-invoice-data">Export Inv.</Link>,
        },
        { key: 'gst-hst', label: <Link to="/gst-hst">GST/HST</Link> },
        {
          key: 'accounts-payable',
          label: <Link to="/accounts-payable">A/P</Link>,
        },
        {
          key: 'receiving-deposit',
          label: <Link to="/receiving-deposit">Receiving Dep.</Link>,
        },
        {
          key: 'profitability',
          label: <Link to="/profitability">Profitability</Link>,
        },
      ],
    },
    {
      key: 'accounts-receivable-menu',
      icon: <DollarCircleOutlined />,
      label: 'A/R',
      children: [
        {
          key: 'invoices-not-sent',
          label: <Link to="/invoices-not-sent">Inv. Not Sent</Link>,
        },
        {
          key: 'receivable-age',
          label: <Link to="/receivable-age">Receivable Age</Link>,
        },
        {
          key: 'receive-payments',
          label: <Link to="/receive-payments">Receive Payments</Link>,
        },
        {
          key: 'payments-received',
          label: <Link to="/payments-received">Payments Rec.</Link>,
        },
        { key: 'ar-summary', label: <Link to="/summary">Summary</Link> },
      ],
    },
    {
      key: 'accounts-payable-menu',
      icon: <PayCircleOutlined />,
      label: 'A/P',
      children: [
        {
          key: 'invoices-not-received',
          label: <Link to="/invoices-not-received">Inv. Not Rec.</Link>,
        },
        {
          key: 'payable-day-count',
          label: <Link to="/payable-day-count">Payable Day Count</Link>,
        },
        {
          key: 'make-payment',
          label: <Link to="/make-payment">Make Payment</Link>,
        },
        { key: 'paid-list', label: <Link to="/paid-list">Paid List</Link> },
        { key: 'ap-summary', label: <Link to="/summary">Summary</Link> },
      ],
    },
    {
      key: 'carriers-vendors-brokers',
      icon: <FolderOpenOutlined />,
      label: 'Carriers & Co.',
      children: [
        { key: 'carrier', label: <Link to="/carrier">Carriers</Link> },
        { key: 'vendor', label: <Link to="/vendor">Vendors</Link> },
        { key: 'broker', label: <Link to="/broker">Brokers</Link> },
      ],
    },
    {
      key: 'account-menu',
      icon: <UserOutlined />,
      label: 'Account',
      children: [
        { key: 'user', label: <Link to="/user">Users</Link> },

        { key: 'settings', label: <Link to="/settings">Settings</Link> },
        {
          key: 'change-password',
          label: <Link to="/change-password">Change Password</Link>,
        },
      ],
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const items = useMemo(() => {
    console.log('Current user role in MenuList:', userRole);
    return userRole === 'employee' ? employeeItems : adminItems;
  }, [userRole, employeeItems, adminItems]);

  console.log('Current user role in MenuList:', userRole);

  const getSelectedKeys = () => {
    return items.reduce((acc, item) => {
      if (item.label && item.label.props && item.label.props.to === currentPath) {
        acc.push(item.key);
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.label && child.label.props && child.label.props.to) {
            const childPath = child.label.props.to;
            if (currentPath === childPath || currentPath.startsWith(childPath)) {
              acc.push(item.key, child.key);
            }
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
      items={items}
      inlineCollapsed={false}
    />
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default MenuList;

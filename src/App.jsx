import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import CustomNavbar from './components/common/Navbar';
import { UserProvider } from './UserProvider'; // Import UserProvider

const Layout = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/register'];

  return (
    <UserProvider> {/* Wrap Layout with UserProvider */}
      {!hideNavbarRoutes.includes(location.pathname) && <CustomNavbar />}
      <AppRoutes />
    </UserProvider>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;

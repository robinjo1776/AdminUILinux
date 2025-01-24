import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import LeadsPage from './pages/CRM/LeadsPage';
import AddLeadForm from './components/CRM/AddLead/AddLeadForm';
import EditLeadForm from './components/CRM/EditLead/EditLeadForm';
import LeadFollowupPage from './pages/CRM/LeadFollowupPage';
import LeadQuotesPage from './pages/Sales/LeadQuotesPage';
import CustomersPage from './pages/Customers/CustomersPage';
import EditCustomerForm from './components/Customers/EditCustomerForm';
import Orderpage from './pages/Orders/Orderpage';
import EditOrderForm from './components/Orders/EditOrder/EditOrderForm';
import AddOrderForm from './components/Orders/AddOrder/AddOrderForm';
import CarrierPage from './pages/Carriers&Co/CarrierPage';
import AddCarrierForm from './components/Carriers&Co/AddCarrier/AddCarrierForm';
import EditCarrierForm from './components/Carriers&Co/EditCarrier/EditCarrierForm';
import VendorPage from './pages/Carriers&Co/VendorPage';
import AddVendorForm from './components/Carriers&Co/AddVendor/AddVendorForm';
import EditVendorForm from './components/Carriers&Co/EditVendor/EditVendorForm';
import UserPage from './pages/Account/UserPage';
import EditUserForm from './components/Account/EditUserForm';
import PrivateRoute from './components/common/PrivateRoute';
import UserProvider from './UserProvider';
import QuotePage from './pages/Sales/QuotePage';
import EditQuoteForm from './components/Sales/EditQuote/EditQuoteForm';
import BrokerPage from './pages/Carriers&Co/BrokerPage';
import AddBrokerForm from './components/Carriers&Co/AddBroker/AddBrokerForm';
import EditBrokerForm from './components/Carriers&Co/EditBroker/EditBrokerForm';
import KibanaDashboard from './pages/KibanaDashboard';

const AppRoutes = () => (
  <UserProvider>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <LeadsPage />
          </PrivateRoute>
        }
      />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/lead"
        element={
          <PrivateRoute>
            <LeadsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/lead/add-lead"
        element={
          <PrivateRoute>
            <AddLeadForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/lead/:id"
        element={
          <PrivateRoute>
            <EditLeadForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/follow-up"
        element={
          <PrivateRoute>
            <LeadFollowupPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/quotes-lead"
        element={
          <PrivateRoute>
            <LeadQuotesPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/customer"
        element={
          <PrivateRoute>
            <CustomersPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/customer/:id"
        element={
          <PrivateRoute>
            <EditCustomerForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/order"
        element={
          <PrivateRoute>
            <Orderpage />
          </PrivateRoute>
        }
      />
      <Route
        path="/order/add-order"
        element={
          <PrivateRoute>
            <AddOrderForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/order/:id"
        element={
          <PrivateRoute>
            <EditOrderForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/user"
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/:id"
        element={
          <PrivateRoute>
            <EditUserForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/carrier"
        element={
          <PrivateRoute>
            <CarrierPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/carrier/add-carrier"
        element={
          <PrivateRoute>
            <AddCarrierForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/carrier/:id"
        element={
          <PrivateRoute>
            <EditCarrierForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/vendor"
        element={
          <PrivateRoute>
            <VendorPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/vendor/add-vendor"
        element={
          <PrivateRoute>
            <AddVendorForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/vendor/:id"
        element={
          <PrivateRoute>
            <EditVendorForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/broker"
        element={
          <PrivateRoute>
            <BrokerPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/broker/add-broker"
        element={
          <PrivateRoute>
            <AddBrokerForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/broker/:id"
        element={
          <PrivateRoute>
            <EditBrokerForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/shipment"
        element={
          <PrivateRoute>
            <QuotePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/quote/:id"
        element={
          <PrivateRoute>
            <EditQuoteForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <KibanaDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </UserProvider>
);

export default AppRoutes;

import { useState, useEffect } from 'react';

const ViewUserForm = ({ onClose, user }) => {
  const [formUser, setFormUser] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    emp_code: '',
  });
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Update the form when selectedUser changes
  useEffect(() => {
    if (user) {
      console.log('Selected User:', user); // Log selectedUser to see the value

      setFormUser({
        id: user.id,
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        password: '', // Empty password field
        role: user.role || '', // Ensure this is correctly set
        emp_code: user.emp_code || '',
      });
    }
  }, [user]);

  const roleOptions = ['admin', 'employee', 'carrier']; // Ensure carrier or other roles are added if necessary

  return (
    <div className="form-container">
      <form className="form-main">
        <fieldset className="form-section">
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="leadNo">Name</label>
              <div>{formUser.name}</div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="leadDate">Username</label>
              <div>{formUser.username}</div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="email">Email</label>
              <div>{formUser.email}</div>
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="role">User Role</label>
              <div>{formUser.role}</div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="emp_code">Employee Code</label>
              <div>{formUser.emp_code}</div>
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewUserForm;

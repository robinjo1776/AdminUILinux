import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditUserForm = ({ onClose, onUpdate, selectedUser }) => {
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
    if (selectedUser) {
      console.log('Selected User:', selectedUser); // Log selectedUser to see the value

      setFormUser({
        id: selectedUser.id,
        name: selectedUser.name || '',
        username: selectedUser.username || '',
        email: selectedUser.email || '',
        password: '', // Empty password field
        role: selectedUser.role || '', // Ensure this is correctly set
        emp_code: selectedUser.emp_code || '',
      });
    }
  }, [selectedUser]);

  const updateUser = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You are not logged in. Please log in again.',
        });
        return;
      }

      const response = await axios.put(`${API_URL}/users/${formUser.id}`, formUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'User data has been updated successfully.',
      });

      onUpdate(response.data);
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update user.',
      });
    }
  };

  const roleOptions = ['admin', 'employee', 'carrier']; // Ensure carrier or other roles are added if necessary

  console.log('Role Options:', roleOptions); // Debug log

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUser();
        }}
        className="form-main"
      >
        <fieldset className="form-section">
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="leadNo">Name*</label>
              <input value={formUser.name} onChange={(e) => setFormUser({ ...formUser, name: e.target.value })} type="text" required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="leadDate">Username*</label>
              <input value={formUser.username} onChange={(e) => setFormUser({ ...formUser, username: e.target.value })} type="text" required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="email">Email*</label>
              <input value={formUser.email} onChange={(e) => setFormUser({ ...formUser, email: e.target.value })} id="email" type="email" required />
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="password">Password*</label>
              <input value={formUser.password} onChange={(e) => setFormUser({ ...formUser, password: e.target.value })} type="password" required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="website">Confirm Password*</label>
              <input
                value={formUser.website}
                onChange={(e) => setFormUser({ ...formUser, website: e.target.value })}
                id="website"
                type="text"
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="equipmentType">User Role*</label>
              <select
                id="equipmentType"
                value={formUser.role} // This should match the role from formUser
                onChange={(e) => setFormUser({ ...formUser, role: e.target.value })}
              >
                <option value="">Select User Role</option>
                {roleOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="website">Employee Code*</label>
              <input value={formUser.emp_code} onChange={(e) => setFormUser({ ...formUser, emp_code: e.target.value })} type="text" required />
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;

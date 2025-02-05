import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ViewAdditionalInfo({ formLead }) {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Ensure token exists
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter employees
        const employees = response.data.filter((user) => user.role === 'employee');
        setEmployees(employees);
      } catch (error) {
        console.error('Error fetching users:', error);

        // Display alert if unauthorized
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are not authorized to view this data. Please log in again.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while fetching users. Please try again.',
          });
        }
      }
    };

    fetchUsers();
  }, []); // Add empty dependency array to run once when component mounts

  const [employees, setEmployees] = useState([]); // State to hold employees

  const equipmentTypeOptions = ['Van', 'Reefer', 'Flatbed', 'Triaxle', 'Maxi', 'Btrain', 'Roll tite'];

  return (
    <fieldset className="form-section">
      <legend>Additional Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="follow_up_date">Next Follow-Up Date</label>
          <div>{formLead.follow_up_date}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="equipmentType">Equipment Type</label>
          <div>{formLead.equipment_type || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="assignedTo">Assigned To</label>
          <div>{formLead.assigned_to || 'N/A'}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="contactPerson">Contact Person</label>
          <div>{formLead.contact_person || 'N/A'}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="notes">Notes</label>
          <div>{formLead.notes || 'N/A'}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewAdditionalInfo;

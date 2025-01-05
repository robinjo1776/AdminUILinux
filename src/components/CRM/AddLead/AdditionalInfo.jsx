import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AdditionalInfo({ lead, setLead }) {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token exists
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter employees
        const employees = response.data.filter(
          (user) => user.role === "employee"
        );
        setEmployees(employees);
      } catch (error) {
        console.error("Error fetching users:", error);

        // Display alert if unauthorized
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You are not authorized to view this data. Please log in again.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while fetching users. Please try again.",
          });
        }
      }
    };

    fetchUsers();
  }, []); // Add empty dependency array to run once when component mounts

  const [employees, setEmployees] = useState([]); // State to hold employees

  const equipmentTypeOptions = [
    "Van",
    "Reefer",
    "Flatbed",
    "Triaxle",
    "Maxi",
    "Btrain",
    "Roll tite",
  ];

  return (
    <fieldset className="form-section">
      <legend>Additional Information</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person</label>
          <input
            type="text"
            value={lead.contact_person}
            onChange={(e) =>
              setLead({ ...lead, contact_person: e.target.value })
            }
            id="contactPerson"
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            value={lead.notes}
            onChange={(e) => setLead({ ...lead, notes: e.target.value })}
            id="notes"
          />
        </div>
        <div className="form-group">
          <label htmlFor="follow_up_date">Next Follow-Up Date</label>
          <input
            type="date"
            value={lead.follow_up_date}
            onChange={(e) =>
              setLead({ ...lead, follow_up_date: e.target.value })
            }
            id="follow_up_date"
          />
        </div>
        <div className="form-group">
          <label htmlFor="equipmentType">Equipment Type</label>
          <select
            id="equipmentType"
            value={lead.equipment_type}
            onChange={(e) =>
              setLead({ ...lead, equipment_type: e.target.value })
            }
          >
            <option value="">Select Equipment Type</option>
            {equipmentTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To</label>
          <select
            id="assignedTo"
            value={lead.assigned_to}
            onChange={(e) => setLead({ ...lead, assigned_to: e.target.value })}
          >
            <option value="">Select Employee</option>
            {employees.map((user) => (
              <option key={user.name} value={user.name}>
                {" "}
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </fieldset>
  );
}

export default AdditionalInfo;

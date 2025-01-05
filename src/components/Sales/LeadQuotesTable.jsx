import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserContext } from '../../UserProvider';
import EditLeadQuotesForm from './EditLead/EditLeadQuotesForm';

const LeadQuotesTable = () => {
  const users = useContext(UserContext);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const perPage = 100;

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : 'Unknown'; // Fallback if user not found
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token dynamically
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true); // Set loading to true before fetching
        const { data } = await axios.get(`${API_URL}/lead`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Filter only leads with 'Quotations' status
        const filteredData = data.filter((lead) => lead.lead_status === 'Quotations');
        setLeads(filteredData);
      } catch (error) {
        console.error('Error loading leads:', error);
        handleFetchError(error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchLeads();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You need to log in to access this resource.',
      });
    }
  };

  const updateLead = (updatedLead) => {
    setLeads((prevLeads) => prevLeads.map((lead) => (lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead)));
  };

  const deleteLead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.delete(`${API_URL}/lead/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Delete Response:', response);
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
      Swal.fire('Deleted!', 'The lead has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting lead:', error);

      if (error.response) {
        if (error.response.status === 401) {
          // Token is invalid or expired
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'Your session has expired. Please log in again.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete the lead.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An unexpected error occurred.',
        });
      }
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedLead(null);
  };

  const convertToCustomer = async (lead) => {
    // Ask for confirmation before converting
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'This lead will be converted to a customer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, convert it!',
      cancelButtonText: 'No, cancel!',
    });

    if (confirmed.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        // Prepare the lead data by ensuring it has all required fields
        const customerData = {
          cust_name: lead.customer_name,
          cust_email: lead.email,
          cust_primary_state: lead.state,
          // Add any other fields required for the customers table here
        };

        // Log the data to check what we're sending to the backend
        console.log('Customer data to be inserted:', customerData);

        // Make a POST request to add this lead to the customers table
        const response = await axios.post(`${API_URL}/customer`, customerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Converted to customer:', response.data);

        // If the conversion is successful, remove the lead from the leads table
        // Delete the lead from the API and remove it from the table view
        await deleteLead(lead.id); // Call the delete function after conversion

        Swal.fire('Converted!', 'The lead has been converted to a customer.', 'success');
      } catch (error) {
        console.error('Error converting lead to customer:', error);

        // Handle any error in the conversion process
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to convert the lead to a customer.',
        });
      }
    }
  };

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedLeads = filteredLeads.sort((a, b) => {
    // Handle sorting for different data types
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle case where value is null or undefined
    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (sortBy === 'lead_date' || sortBy === 'follow_up_date') {
      // Handle date sorting by comparing timestamps
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (typeof valA === 'string') {
      // Sort strings alphabetically
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    // Default number sorting
    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedLeads.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalPages = Math.ceil(filteredLeads.length / perPage);

  const headers = [
    { key: 'lead_no', label: 'Lead#' },
    { key: 'lead_date', label: 'Date' },
    { key: 'follow_up_date', label: 'Follow Up' },
    { key: 'customer_name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'equipment_type', label: 'Equipment Type' },
    { key: 'state', label: 'Province/State' },
    { key: 'lead_type', label: 'Type' },
    { key: 'assigned_to', label: 'Assigned To' },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteLead(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
          {item.lead_status === 'Quotations' && (
            <button onClick={() => convertToCustomer(item)} className="btn-convert">
              Convert to Customer
            </button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      {/* Header with Add Lead button and search input */}
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Lead quotes</h1>
        </div>
        <div className="search-container">
          <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
        </div>
      </div>

      {/* Loading state: Show a loading indicator */}
      {loading ? (
        <div className="loading-indicator">
          <span>Loading leads...</span>
        </div>
      ) : (
        // Table will show only once data is fetched
        <Table
          data={paginatedData}
          headers={headers.map((header) => ({
            ...header,
            label: (
              <div className="sortable-header" onClick={() => handleSort(header.key)}>
                {header.label}
                {sortBy === header.key && (
                  <span className="sort-icon">
                    {sortDesc ? '▲' : '▼'} {/* Render Asc/Desc icon based on the sort order */}
                  </span>
                )}
              </div>
            ),
          }))}
          handleSort={handleSort}
          sortBy={sortBy}
          sortDesc={sortDesc}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          onEditClick={openEditModal}
        />
      )}

      {/* Edit Lead Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Lead">
        {selectedLead && <EditLeadQuotesForm lead={selectedLead} onClose={closeEditModal} onUpdate={updateLead} />}
      </Modal>
    </div>
  );
};

export default LeadQuotesTable;

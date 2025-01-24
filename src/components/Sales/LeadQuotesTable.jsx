import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
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
  const [selectedLeadQuotes, setSelectedLeadQuotes] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

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

  const toggleSelectAll = () => {
    if (selectedLeadQuotes.length === paginatedData.length) {
      setSelectedLeadQuotes([]);
    } else {
      setSelectedLeadQuotes(paginatedData.map((quote) => quote.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedLeadQuotes((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]));
  };

  const deleteSelected = async () => {
    if (selectedLeadQuotes.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No record selected',
        text: 'Please select a record to delete.',
      });
      return;
    }

    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete selected!',
      cancelButtonText: 'No, cancel!',
    });

    if (confirmed.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        await Promise.all(
          selectedLeadQuotes.map((id) =>
            axios.delete(`${API_URL}/lead/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setLeads((prevLeads) => prevLeads.filter((lead) => !selectedLeadQuotes.includes(lead.id)));

        setSelectedLeadQuotes([]); // Clear selected customers after deletion
        Swal.fire('Deleted!', 'Selected quotes have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting quotes:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected quotes.',
        });
      }
    }
  };

  // Sorting logic
  const handleSort = (column) => {
    if (column === 'checkbox') return;
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
        await deleteSelected(lead.id); // Call the delete function after conversion

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

  const paginatedData = sortedLeads.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

  const headers = [
    {
      key: 'select',
      label: (
        <input type="checkbox" onChange={toggleSelectAll} checked={selectedLeadQuotes.length === paginatedData.length && paginatedData.length > 0} />
      ),
      render: (item) => <input type="checkbox" checked={selectedLeadQuotes.includes(item.id)} onChange={() => toggleSelect(item.id)} />,
    },
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
      key: 'edit',
      label: 'Edit',
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
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
          <h1 className="page-heading">Leads with Quotes</h1>
        </div>
        <div className="search-container">
          <div className="search-input-wrapper">
            <SearchOutlined className="search-icon" />
            <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
          </div>
        </div>
      </div>
      <div className="controls-container">
        <div className="pagination-controls">
          <div className="rows-per-page-container">
            <label htmlFor="rowsPerPage">Rows per page: </label>
            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={8}>8</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
            </select>
          </div>
        </div>
        <button onClick={deleteSelected} className="delete-button">
          Delete&nbsp; <DeleteOutlined />
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : leads.length === 0 ? (
        <div>No records found</div>
      ) : (
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

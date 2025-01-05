import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import EditLeadForm from './EditLead/EditLeadForm';
import AddLeadForm from './AddLead/AddLeadForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserContext } from '../../UserProvider';

const LeadTable = () => {
  const users = useContext(UserContext);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const perPage = 100;

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : 'Unknown';
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
        console.log('Fetched Leads:', data); // Debugging the fetched data
        setLeads(data);
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
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (confirmed.isConfirmed) {
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

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
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
    {
      key: 'assigned_to',
      label: 'Assigned To',
      render: (item) => <span>{item.assigned_to ? item.assigned_to : 'Unassigned'}</span>,
    },
    {
      key: 'lead_status',
      label: 'Status',
      render: (item) => <span className={`badge ${getStatusClass(item.lead_status)}`}>{item.lead_status}</span>,
    },
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
        </>
      ),
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Prospect customer':
        return 'badge-prospect';
      case 'Lanes discussed':
        return 'badge-lanes';
      case 'Product/Equipment discussed':
        return 'badge-product';
      case 'E-mail sent to concerned person':
        return 'badge-email';
      case 'Carrier portal registration':
        return 'badge-carrier';
      case 'Quotations':
        return 'badge-quotation';
      case 'Fob/Have broker':
        return 'badge-broker';
      case 'Voicemail/No answer':
        return 'badge-voicemail';
      case 'Different Department':
        return 'badge-different';
      case 'No answer/Callback/Voicemail':
        return 'badge-callback';
      case 'Not interested':
        return 'badge-not-interested';
      case 'Asset based only':
        return 'badge-asset';
      default:
        return 'badge-default';
    }
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Leads</h1>
          <button onClick={openAddModal} className="add-button">
            Add
          </button>
        </div>
        <div className="search-container">
          <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search leads..." />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
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
        {selectedLead && <EditLeadForm lead={selectedLead} onClose={closeEditModal} onUpdate={updateLead} />}
      </Modal>

      {/* Add Lead Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Lead">
        <AddLeadForm
          onClose={closeAddModal}
          onAddLead={(newLead) => {
            setLeads((prevLeads) => [...prevLeads, newLead]);
            closeAddModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default LeadTable;

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditLeadFollowupForm from './EditFollowup/EditLeadFollowupForm';

const LeadFollowupTable = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('lead_date');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFollowup, setselectedFollowup] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const perPage = 100;

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true);
        const { data } = await axios.get(`${API_URL}/lead-followup`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched Leads:', data);
        setFollowUps(data);
      } catch (error) {
        console.error('Error loading leads:', error);
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUps();
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

  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  const openEditModal = (followUp) => {
    setselectedFollowup(followUp);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setselectedFollowup(null);
  };

  const updateFollowup = (updatedFollowup) => {
    setFollowUps((prevFollowups) =>
      prevFollowups.map((followUp) => (followUp.id === updatedFollowup.id ? { ...followUp, ...updatedFollowup } : followUp))
    );
  };

  const deleteFollowup = async (id) => {
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

        const response = await axios.delete(`${API_URL}/lead-followup/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Delete Response:', response);
        setFollowUps((prevFollowups) => prevFollowups.filter((followUp) => followUp.id !== id));
        Swal.fire('Deleted!', 'The follow-up has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting follow-up:', error);

        if (error.response) {
          if (error.response.status === 401) {
            // Token is invalid or expired
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized',
              text: 'Your session has expired. Please log in again.',
            });

            // Optionally, redirect to login page here
            // navigate('/login');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to delete the follow-up.',
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
  // Search filtering
  const filteredFollowUps = followUps.filter(
    (followUp) =>
      followUp.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      followUp.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      followUp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  const sortedFollowUps = filteredFollowUps.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle case where value is null or undefined
    if (valA == null) valA = ''; // Replace null/undefined with an empty string for comparison
    if (valB == null) valB = ''; // Replace null/undefined with an empty string for comparison

    if (sortBy === 'lead_date' || sortBy === 'next_follow_up_date') {
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

  const paginatedData = sortedFollowUps.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalPages = Math.ceil(filteredFollowUps.length / perPage);

  const headers = [
    { key: 'lead_no', label: 'Lead#' },
    { key: 'lead_date', label: 'Date' },
    { key: 'customer_name', label: 'Customer Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'lead_type', label: 'Lead Type' },
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
          <button onClick={() => deleteFollowup(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];
  const getStatusClass = (status) => {
    switch (status) {
      case 'New':
        return 'badge-new';
      case 'In Progress':
        return 'badge-in-progress';
      case 'Completed':
        return 'badge-completed';
      case 'On Hold':
        return 'badge-on-hold';
      case 'Lost':
        return 'badge-lost';
      default:
        return 'badge-default';
    }
  };
  return (
    <div className="lead-followup-table">
      {loading ? (
        <div className="loading-indicator">
          <span>Loading follow-ups...</span>
        </div>
      ) : (
        <>
          <div className="header-container">
            <div className="header-actions">
              <h1 className="page-heading">Follow-ups</h1>
            </div>
            <div className="search-container">
              <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
            </div>
          </div>

          {followUps.length === 0 ? (
            <div className="no-data-message">No follow-up data available</div>
          ) : (
            <Table
              data={paginatedData}
              headers={headers.map((header) => ({
                ...header,
                label: (
                  <div className="sortable-header" onClick={() => handleSort(header.key)}>
                    {header.label}
                    {sortBy === header.key && <span className="sort-icon">{sortDesc ? '▲' : '▼'}</span>}
                  </div>
                ),
              }))}
              handleSort={handleSort}
              sortBy={sortBy}
              sortDesc={sortDesc}
              currentPage={currentPage}
              totalPages={totalPages}
              searchQuery={searchQuery}
              setCurrentPage={setCurrentPage}
              onEditClick={openEditModal}
            />
          )}
        </>
      )}

      {/* Edit Followup Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Followup">
        {selectedFollowup && <EditLeadFollowupForm followUp={selectedFollowup} onClose={closeEditModal} onUpdate={updateFollowup} />}
      </Modal>
    </div>
  );
};

export default LeadFollowupTable;

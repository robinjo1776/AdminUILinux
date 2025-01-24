import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import EditLeadForm from './EditLead/EditLeadForm';
import AddLeadForm from './AddLead/AddLeadForm';
import { EditOutlined, DeleteOutlined, EnvironmentOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

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

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((lead) => lead.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) {
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
          selectedIds.map((id) =>
            axios.delete(`${API_URL}/lead/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setLeads((prevLeads) => prevLeads.filter((lead) => !selectedIds.includes(lead.id)));
        setSelectedIds([]);
        Swal.fire('Deleted!', 'Selected leads have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting leads:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected leads.',
        });
      }
    }
  };

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

  const paginatedData = sortedLeads.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

  const headers = [
    {
      key: 'checkbox',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" checked={selectedIds.length === paginatedData.length && paginatedData.length > 0} onChange={toggleSelectAll} />
        </div>
      ),
      render: (lead) => <input type="checkbox" checked={selectedIds.includes(lead.id)} onChange={() => toggleSelect(lead.id)} />,
    },
    { key: 'lead_no', label: 'Lead#' },
    { key: 'lead_date', label: 'Date' },
    { key: 'follow_up_date', label: 'Follow Up' },
    { key: 'customer_name', label: 'Name' },
    { key: 'equipment_type', label: 'Equipment Type' },
    {
      key: 'state',
      label: 'Province/State',
      render: (item) => (
        <span>
          <EnvironmentOutlined style={{ marginRight: 5 }} />
          {item.state}
        </span>
      ),
    },

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
      key: 'edit',
      label: 'Edit',
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
        </>
      ),
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Prospect':
        return 'badge-prospect';
      case 'Lanes discussed':
        return 'badge-lanes';
      case 'Prod/Equip noted':
        return 'badge-product';
      case 'E-mail sent':
        return 'badge-email';
      case 'Portal registration':
        return 'badge-carrier';
      case 'Quotations':
        return 'badge-quotation';
      case 'Fob/Have broker':
        return 'badge-broker';
      case 'VM/No answer':
        return 'badge-voicemail';
      case 'Diff Dept.':
        return 'badge-different';
      case 'No reply':
        return 'badge-callback';
      case 'Not Int.':
        return 'badge-not-interested';
      case 'Asset based':
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
        </div>
        <div className="search-container">
          <div className="search-input-wrapper">
            <SearchOutlined className="search-icon" />
            <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
          </div>
          <button onClick={openAddModal} className="add-button">
            <PlusOutlined />
          </button>
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
          Delete&nbsp;
          <DeleteOutlined />
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

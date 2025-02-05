import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined, MailOutlined, PlusOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import AddVendorForm from './AddVendor/AddVendorForm';
import EditVendorForm from './EditVendor/EditVendorForm';
import ViewVendorForm from './ViewVendor/ViewVendorForm';

const VendorTable = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [emailData, setEmailData] = useState({ subject: '', content: '' });
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true);
        const { data } = await axios.get(`${API_URL}/vendor`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched vendors:', data);
        setVendors(data);
      } catch (error) {
        console.error('Error loading vendors:', error);
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
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

  const updateVendor = (updatedVendor) => {
    setVendors((prevVendors) => prevVendors.map((vendor) => (vendor.id === updatedVendor.id ? { ...vendor, ...updatedVendor } : vendor)));
  };

  const toggleSelectAll = () => {
    if (selectedVendors.length === paginatedData.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(paginatedData.map((vendor) => vendor.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedVendors((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]));
  };

  const deleteSelected = async () => {
    if (selectedVendors.length === 0) {
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
          selectedVendors.map((id) =>
            axios.delete(`${API_URL}/vendor/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setVendors((prevVendors) => prevVendors.filter((vendor) => !selectedVendors.includes(vendor.id)));
        setSelectedVendors([]);
        Swal.fire('Deleted!', 'Selected vendors have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting vendors:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected vendors.',
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

  const openEditModal = (vendor) => {
    setSelectedVendor(vendor);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedVendor(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  const openViewModal = (vendor) => {
    setSelectedVendor(vendor);
    setViewModalOpen(true);
  };
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedVendor(null);
  };
  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredVendors = vendors.filter((carrier) =>
    Object.values(carrier).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedVendors = filteredVendors.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (typeof valA === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedVendors.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const totalPages = Math.ceil(filteredVendors.length / rowsPerPage);

  const renderSortableHeader = (header) => {
    const nonSortableColumns = ['checkbox', 'actions'];

    // Only render sort icons for sortable columns
    if (nonSortableColumns.includes(header.key)) {
      return <div className="sortable-header">{header.label}</div>;
    }

    const isSortedColumn = sortBy === header.key;
    const sortDirection = isSortedColumn ? (sortDesc ? '▼' : '▲') : '▲';

    return (
      <div className="sortable-header" onClick={() => handleSort(header.key)}>
        {header.label}
        <span className="sort-icon">{sortDirection}</span>
      </div>
    );
  };

  const headers = [
    {
      key: 'checkbox',
      label: (
        <input type="checkbox" onChange={toggleSelectAll} checked={selectedVendors.length === paginatedData.length && paginatedData.length > 0} />
      ),
      render: (item) => <input type="checkbox" checked={selectedVendors.includes(item.id)} onChange={() => toggleSelect(item.id)} />,
    },
    { key: 'legal_name', label: 'Legal Name' },
    { key: 'vendor_code', label: 'Code' },
    { key: 'primary_address', label: 'Address' },
    { key: 'primary_phone', label: 'Phone' },
    { key: 'primary_email', label: 'Email' },
    { key: 'vendor_type', label: 'Type' },
    { key: 'service', label: 'Service' },

    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <>
          <button onClick={() => openViewModal(item)} className="btn-view">
            <EyeOutlined />
          </button>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
        </>
      ),
    },
  ];

  const sendEmails = async (subject, content) => {
    if (selectedVendors.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No vendors selected',
        text: 'Please select vendors to send emails to.',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const emailData = {
        ids: selectedVendors,
        subject,
        content,
        module: 'vendors',
      };

      const response = await axios.post(`${API_URL}/email`, emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      Swal.fire('Success!', 'Emails have been sent.', 'success');
      setEmailModalOpen(false);
      setSelectedVendors([]);
    } catch (error) {
      console.error('Error sending emails:', error.response ? error.response.data : error.message);
      Swal.fire('Error!', 'Failed to send emails.', 'error');
    }
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-container-left">
          <div className="header-actions">
            <h1 className="page-heading">Vendors</h1>
          </div>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <SearchOutlined className="search-icon" />
            <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <button onClick={openAddModal} className="add-button">
            <PlusOutlined />
          </button>
          <button onClick={() => setEmailModalOpen(true)} className="send-email-button" disabled={selectedVendors.length === 0}>
            <MailOutlined />
          </button>
          <button onClick={deleteSelected} className="delete-button">
            <DeleteOutlined />
          </button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : vendors.length === 0 ? (
        <div>No records found</div>
      ) : (
        <Table
          data={paginatedData}
          headers={headers.map((header) => ({
            ...header,
            label: renderSortableHeader(header),
          }))}
          handleSort={handleSort}
          sortBy={sortBy}
          sortDesc={sortDesc}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Vendor">
        {selectedVendor && <EditVendorForm vendor={selectedVendor} onClose={closeEditModal} onUpdate={updateVendor} />}
      </Modal>

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Vendor">
        <AddVendorForm
          onClose={closeAddModal}
          onAddVendor={(newVendor) => {
            setVendors((prevVendors) => [...prevVendors, newVendor]);
            closeAddModal();
          }}
        />
      </Modal>

      <Modal isOpen={isEmailModalOpen} onClose={() => setEmailModalOpen(false)} title="Send Email">
        <div className="email-modal">
          <div>
            <label htmlFor="subject">Subject:</label>
            <input type="text" placeholder="Subject" onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea placeholder="Content" onChange={(e) => setEmailData({ ...emailData, content: e.target.value })} />
          </div>
          <button type="submit" onClick={() => sendEmails(emailData.subject, emailData.content)}>
            Send
          </button>
        </div>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Vendor Details">
        {selectedVendor && <ViewVendorForm vendor={selectedVendor} onClose={closeViewModal} />}
      </Modal>
    </div>
  );
};

export default VendorTable;

import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import EditCustomerForm from './EditCustomer/EditCustomerForm';
import { EditOutlined, DeleteOutlined, MailOutlined, SearchOutlined, EyeOutlined} from '@ant-design/icons';
import ViewCustomerForm from './ViewCustomer/ViewCustomerForm';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({ subject: '', content: '' });
  const [rowsPerPage, setRowsPerPage] = useState(100);
  var API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  // Fetch customer data on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are not logged in.',
          });
          return;
        }

        setLoading(true);
        const { data } = await axios.get(`${API_URL}/customer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomers(data);
      } catch (error) {
        console.error('Error loading customers:', error);
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You need to log in to access this resource.',
      });
      window.location.href = '/login';
    }
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) => (customer.id === updatedCustomer.id ? { ...customer, ...updatedCustomer } : customer))
    );
  };
  const toggleSelectAll = () => {
    if (selectedCustomers.length === paginatedData.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(paginatedData.map((customer) => customer.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedCustomers((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]));
  };

  const deleteSelected = async () => {
    if (selectedCustomers.length === 0) {
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
          selectedCustomers.map((id) =>
            axios.delete(`${API_URL}/customer/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setCustomers((prevCustomers) => prevCustomers.filter((customer) => !selectedCustomers.includes(customer.id)));

        setSelectedCustomers([]); // Clear selected customers after deletion
        Swal.fire('Deleted!', 'Selected customers have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting customers:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected customers.',
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

  // Search filtering
  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (typeof valA === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    return sortDesc ? valB - valA : valA - valB;
  });

  // Pagination logic
  const paginatedData = sortedCustomers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  const renderSortableHeader = (header) => {
    // Define columns that should not have a sort icon
    const nonSortableColumns = ['checkbox', 'actions'];

    // Only render sort icons for sortable columns
    if (nonSortableColumns.includes(header.key)) {
      return <div className="sortable-header">{header.label}</div>;
    }

    const isSortedColumn = sortBy === header.key; // Check if this column is sorted
    const sortDirection = isSortedColumn
      ? sortDesc
        ? '▼'
        : '▲' // If sorted, show descending (▼) or ascending (▲)
      : '▲'; // Default to ascending (▲) if not sorted

    return (
      <div className="sortable-header" onClick={() => handleSort(header.key)}>
        {header.label}
        <span className="sort-icon">{sortDirection}</span> {/* Always show an arrow for sortable columns */}
      </div>
    );
  };
  // Table headers
  const headers = [
    {
      key: 'checkbox',
      label: (
        <input type="checkbox" onChange={toggleSelectAll} checked={selectedCustomers.length === paginatedData.length && paginatedData.length > 0} />
      ),
      render: (item) => <input type="checkbox" checked={selectedCustomers.includes(item.id)} onChange={() => toggleSelect(item.id)} />,
    },
    { key: 'cust_name', label: 'Name' },
    { key: 'cust_type', label: 'Type' },
    { key: 'cust_email', label: 'Email' },
    { key: 'cust_contact_no', label: 'Contact No' },
    { key: 'cust_primary_address', label: 'Primary Address' },
    { key: 'cust_primary_city', label: 'Primary City' },
    { key: 'cust_primary_state', label: 'Primary State' },
    { key: 'cust_primary_country', label: 'Primary Country' },
    {
      key: 'cust_credit_status',
      label: 'Status',
      render: (item) => <span className={`badge ${getStatusClass(item.cust_credit_status)}`}>{item.cust_credit_status}</span>,
    },
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

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'badge-product';
      case 'Not Approved':
        return 'badge-lanes';
      default:
        return 'badge-default';
    }
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedCustomer(null);
  };
  const openViewModal = (customer) => {
    setSelectedCustomer(customer);
    setViewModalOpen(true);
  };
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedCustomer(null);
  };
  const sendEmails = async (subject, content) => {
    if (selectedCustomers.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No customers selected',
        text: 'Please select customers to send emails to.',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const emailData = {
        ids: selectedCustomers,
        subject,
        content,
        module: 'customers',
      };

      const response = await axios.post(`${API_URL}/email`, emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      Swal.fire('Success!', 'Emails have been sent.', 'success');
      setEmailModalOpen(false);
      setSelectedCustomers([]);
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
            <h1 className="page-heading">Customers</h1>
          </div>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <SearchOutlined className="search-icon" />
            <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <button onClick={() => setEmailModalOpen(true)} className="send-email-button" disabled={selectedCustomers.length === 0}>
            <MailOutlined />
          </button>
          <button onClick={deleteSelected} className="delete-button">
            <DeleteOutlined />
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : customers.length === 0 ? (
        <div>No records found</div>
      ) : (
        <Table
          data={paginatedData}
          headers={headers.map((header) => ({
            ...header,
            label: renderSortableHeader(header), // Render sortable header logic
          }))}
          handleSort={handleSort}
          sortBy={sortBy}
          sortDesc={sortDesc}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Customer">
        {selectedCustomer && <EditCustomerForm customer={selectedCustomer} onClose={closeEditModal} onUpdate={updateCustomer} />}
      </Modal>
      <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Customer Details">
        {selectedCustomer && <ViewCustomerForm customer={selectedCustomer} onClose={closeViewModal} />}
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
    </div>
  );
};

export default CustomerTable;

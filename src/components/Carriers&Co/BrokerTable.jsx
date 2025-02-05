import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined, MailOutlined, PlusOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import AddBrokerForm from './AddBroker/AddBrokerForm';
import EditBrokerForm from './EditBroker/EditBrokerForm';
import ViewBrokerForm from './ViewBroker/ViewBrokerForm';

const BrokerTable = () => {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedBrokers, setSelectedBrokers] = useState([]);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [emailData, setEmailData] = useState({ subject: '', content: '' });
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true);
        const { data } = await axios.get(`${API_URL}/broker`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched brokers:', data);
        setBrokers(data);
      } catch (error) {
        console.error('Error loading brokers:', error);
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokers();
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

  const updateBroker = (updatedBroker) => {
    setBrokers((prevBrokers) => prevBrokers.map((broker) => (broker.id === updatedBroker.id ? { ...broker, ...updatedBroker } : broker)));
  };

  const toggleSelectAll = () => {
    if (selectedBrokers.length === paginatedData.length) {
      setSelectedBrokers([]);
    } else {
      setSelectedBrokers(paginatedData.map((broker) => broker.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedBrokers((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]));
  };

  const deleteSelected = async () => {
    if (selectedBrokers.length === 0) {
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
          selectedBrokers.map((id) =>
            axios.delete(`${API_URL}/broker/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setBrokers((prevBrokers) => prevBrokers.filter((broker) => !selectedBrokers.includes(broker.id)));
        setSelectedBrokers([]);
        Swal.fire('Deleted!', 'Selected brokers have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting brokers:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected brokers.',
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

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredBrokers = brokers.filter((broker) =>
    Object.values(broker).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedBrokers = filteredBrokers.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (typeof valA === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedBrokers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const totalPages = Math.ceil(filteredBrokers.length / rowsPerPage);

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
        <input type="checkbox" onChange={toggleSelectAll} checked={selectedBrokers.length === paginatedData.length && paginatedData.length > 0} />
      ),
      render: (item) => <input type="checkbox" checked={selectedBrokers.includes(item.id)} onChange={() => toggleSelect(item.id)} />,
    },
    { key: 'broker_name', label: 'Name' },
    { key: 'broker_address', label: 'Street' },
    { key: 'broker_city', label: 'City' },
    { key: 'broker_state', label: 'State' },
    { key: 'broker_country', label: 'Country' },
    { key: 'broker_email', label: 'Email' },
    { key: 'broker_phone', label: 'Phone' },
    { key: 'broker_fax', label: 'Fax' },
    { key: 'broker_ext', label: ' Phone Ext' },
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

  const openEditModal = (broker) => {
    setSelectedBroker(broker);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedBroker(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  const openViewModal = (broker) => {
    setSelectedBroker(broker);
    setViewModalOpen(true);
  };
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedBroker(null);
  };
  const sendEmails = async (subject, content) => {
    if (selectedBrokers.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No brokers selected',
        text: 'Please select brokers to send emails to.',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const emailData = {
        ids: selectedBrokers,
        subject,
        content,
        module: 'brokers',
      };

      const response = await axios.post(`${API_URL}/email`, emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      Swal.fire('Success!', 'Emails have been sent.', 'success');
      setEmailModalOpen(false);
      setSelectedBrokers([]);
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
          <button onClick={() => setEmailModalOpen(true)} className="send-email-button" disabled={selectedBrokers.length === 0}>
            <MailOutlined />
          </button>
          <button onClick={deleteSelected} className="delete-button">
            <DeleteOutlined />
          </button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : brokers.length === 0 ? (
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

      {/* Edit Broker Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Broker">
        {selectedBroker && <EditBrokerForm broker={selectedBroker} onClose={closeEditModal} onUpdate={updateBroker} />}
      </Modal>

      {/* Add Broker Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Broker">
        <AddBrokerForm
          onClose={closeAddModal}
          onAddBroker={(newBroker) => {
            setBrokers((prevBrokers) => [...prevBrokers, newBroker]);
            closeAddModal();
          }}
        />
      </Modal>

      {/* Email Modal */}
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

      <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Broker Details">
        {selectedBroker && <ViewBrokerForm broker={selectedBroker} onClose={closeViewModal} />}
      </Modal>
    </div>
  );
};

export default BrokerTable;

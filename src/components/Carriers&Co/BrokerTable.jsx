import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddBrokerForm from './AddBroker/AddBrokerForm';
import EditBrokerForm from './EditBroker/EditBrokerForm';

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
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const perPage = 100;

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/broker`, {
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

  const deleteBroker = async (id) => {
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

        const response = await axios.delete(`${API_URL}/api/broker/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Delete Response:', response);
        setBrokers((prevBrokers) => prevBrokers.filter((broker) => broker.id !== id));
        Swal.fire('Deleted!', 'The broker has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting broker:', error);
        Swal.fire('Error!', 'Failed to delete the broker.', 'error');
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

  const paginatedData = sortedBrokers.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalPages = Math.ceil(filteredBrokers.length / perPage);

  const headers = [
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
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteBroker(item.id)} className="btn-delete">
            <DeleteOutlined />
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

  return (
    <div>
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Brokers</h1>
          <button onClick={openAddModal} className="add-button">
            Add
          </button>
        </div>
        <div className="search-container">
          <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search ..." />
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
                {sortBy === header.key && <span className="sort-icon">{sortDesc ? '▲' : '▼'}</span>}
              </div>
            ),
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
    </div>
  );
};

export default BrokerTable;

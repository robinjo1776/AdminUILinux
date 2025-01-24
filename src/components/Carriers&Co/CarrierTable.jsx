import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import EditCarrierForm from './EditCarrier/EditCarrierForm';
import AddCarrierForm from './AddCarrier/AddCarrierForm';
import { EditOutlined, DeleteOutlined, MailOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { UserContext } from '../../UserProvider';

const CarrierTable = () => {
  const users = useContext(UserContext);
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedCarriers, setSelectedCarriers] = useState([]);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [emailData, setEmailData] = useState({ subject: '', content: '' });
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true);
        const { data } = await axios.get(`${API_URL}/carrier`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched Carriers:', data);
        setCarriers(data);
      } catch (error) {
        console.error('Error loading carriers:', error);
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarriers();
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

  const updateCarrier = (updatedCarrier) => {
    setCarriers((prevCarriers) => prevCarriers.map((carrier) => (carrier.id === updatedCarrier.id ? { ...carrier, ...updatedCarrier } : carrier)));
  };
  const toggleSelectAll = () => {
    if (selectedCarriers.length === paginatedData.length) {
      setSelectedCarriers([]);
    } else {
      setSelectedCarriers(paginatedData.map((carrier) => carrier.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedCarriers((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]));
  };

  const deleteSelected = async () => {
    if (selectedCarriers.length === 0) {
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
          selectedCarriers.map((id) =>
            axios.delete(`${API_URL}/carrier/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setCarriers((prevCarriers) => prevCarriers.filter((carrier) => !selectedCarriers.includes(carrier.id)));
        setSelectedCarriers([]);
        Swal.fire('Deleted!', 'Selected carriers have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting carriers:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected carriers.',
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
  const filteredCarriers = carriers.filter((carrier) =>
    Object.values(carrier).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedCarriers = filteredCarriers.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (typeof valA === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedCarriers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const totalPages = Math.ceil(filteredCarriers.length / rowsPerPage);

  const headers = [
    {
      key: 'select',
      label: (
        <input type="checkbox" onChange={toggleSelectAll} checked={selectedCarriers.length === paginatedData.length && paginatedData.length > 0} />
      ),
      render: (item) => <input type="checkbox" checked={selectedCarriers.includes(item.id)} onChange={() => toggleSelect(item.id)} />,
    },
    { key: 'dba', label: 'DBA' },
    { key: 'legal_name', label: 'Legal Name' },
    { key: 'acc_no', label: 'Account No.' },
    { key: 'carr_type', label: 'Carrier Type' },
    { key: 'rating', label: 'Rating' },
    { key: 'dot_number', label: 'DOT Number' },
    {
      key: 'approved',
      label: 'Approved',
      render: (item) => (
        <span style={{ color: item.approved ? 'green' : 'red', fontWeight: 'bold' }}>{item.approved ? 'Approved' : 'Not Approved'}</span>
      ),
    },
    {
      key: 'advertise',
      label: 'Advertised',
      render: (item) => <span style={{ color: item.advertise ? 'green' : 'red', fontWeight: 'bold' }}>{item.advertise ? 'Yes' : 'No'}</span>,
    },
    { key: 'primary_city', label: 'City' },
    { key: 'primary_state', label: 'State' },
    { key: 'primary_country', label: 'Country' },
    { key: 'primary_phone', label: 'Phone' },
    { key: 'li_coverage', label: 'Liability Coverage' },
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

  const openEditModal = (carrier) => {
    setSelectedCarrier(carrier);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedCarrier(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const sendEmails = async (subject, content) => {
    if (selectedCarriers.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No carriers selected',
        text: 'Please select carriers to send emails to.',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const emailData = {
        ids: selectedCarriers,
        subject,
        content,
        module: 'carriers',
      };

      const response = await axios.post(`${API_URL}/email`, emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      Swal.fire('Success!', 'Emails have been sent.', 'success');
      setEmailModalOpen(false);
      setSelectedCarriers([]);
    } catch (error) {
      console.error('Error sending emails:', error.response ? error.response.data : error.message);
      Swal.fire('Error!', 'Failed to send emails.', 'error');
    }
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Carriers</h1>
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
        <div className="button-group">
          <button onClick={() => setEmailModalOpen(true)} className="send-email-button" disabled={selectedCarriers.length === 0}>
            Email&nbsp; <MailOutlined />
          </button>
          <button onClick={deleteSelected} className="delete-button">
            Delete&nbsp; <DeleteOutlined />
          </button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : carriers.length === 0 ? (
        <div>No records found</div>
      ) : (
        <Table
          data={paginatedData}
          headers={headers.map((header) => {
            // Prevent sorting logic for the checkbox column
            if (header.key === 'select') {
              return {
                ...header,
                label: (
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selectedCarriers.length === paginatedData.length && paginatedData.length > 0}
                  />
                ),
              };
            }

            return {
              ...header,
              label: (
                <div className="sortable-header" onClick={() => handleSort(header.key)}>
                  {header.label}
                  {sortBy === header.key && <span className="sort-icon">{sortDesc ? '▲' : '▼'}</span>}
                </div>
              ),
            };
          })}
          handleSort={handleSort}
          sortBy={sortBy}
          sortDesc={sortDesc}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Edit Carrier Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Carrier">
        {selectedCarrier && <EditCarrierForm carrier={selectedCarrier} onClose={closeEditModal} onUpdate={updateCarrier} />}
      </Modal>

      {/* Add Carrier Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Carrier">
        <AddCarrierForm
          onClose={closeAddModal}
          onAddCarrier={(newCarrier) => {
            setCarriers((prevCarriers) => [...prevCarriers, newCarrier]);
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
    </div>
  );
};

export default CarrierTable;

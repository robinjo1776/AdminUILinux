import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import EditCarrierForm from './EditCarrier/EditCarrierForm';
import AddCarrierForm from './AddCarrier/AddCarrierForm';
import { EditOutlined, DeleteOutlined, MailOutlined } from '@ant-design/icons';
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
  const [emailData, setEmailData] = useState({ subject: '', content: '' });
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const perPage = 100;

  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/carrier`, {
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

  const deleteCarrier = async (id) => {
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

        const response = await axios.delete(`${API_URL}/api/carrier/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Delete Response:', response);
        setCarriers((prevCarriers) => prevCarriers.filter((carrier) => carrier.id !== id));
        Swal.fire('Deleted!', 'The carrier has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting carrier:', error);
        Swal.fire('Error!', 'Failed to delete the carrier.', 'error');
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

  const paginatedData = sortedCarriers.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalPages = Math.ceil(filteredCarriers.length / perPage);

  const headers = [
    {
      key: 'select',
      label: 'Select',
      render: (item) => <input type="checkbox" checked={selectedCarriers.includes(item.id)} onChange={() => toggleCarrierSelection(item.id)} />,
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
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteCarrier(item.id)} className="btn-delete">
            <DeleteOutlined />
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

  const toggleCarrierSelection = (id) => {
    setSelectedCarriers((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((carrierId) => carrierId !== id) : [...prevSelected, id]));
  };

  const sendEmails = async (subject, content) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      if (selectedCarriers.length === 0) {
        Swal.fire('Error!', 'Please select at least one carrier to send the email.', 'error');
        return;
      }

      const emailData = {
        ids: selectedCarriers, // The carrier IDs for email sending
        subject,
        content,
      };

      const response = await axios.post(`${API_URL}/api/email`, emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Email Response:', response);
      Swal.fire('Success!', 'Emails have been sent.', 'success');
      setEmailModalOpen(false);
      setSelectedCarriers([]); // Clear the selected carriers after sending the email
    } catch (error) {
      console.error('Error sending emails:', error.response ? error.response.data : error.message);
      Swal.fire('Error!', 'Failed to send emails.', 'error');
    }
  };

  const handleEmailSubmit = () => {
    if (!emailData.subject || !emailData.content) {
      Swal.fire('Error!', 'Please provide both subject and content for the email.', 'error');
      return;
    }

    sendEmails(emailData.subject, emailData.content);
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Carriers</h1>
          <button onClick={openAddModal} className="add-button">
            Add
          </button>
        </div>
        <button onClick={() => setEmailModalOpen(true)} className="send-email-button" disabled={selectedCarriers.length === 0}>
          Email <MailOutlined />
        </button>
        <div className="search-container">
          <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search carriers..." />
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

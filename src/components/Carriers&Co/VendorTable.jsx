import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserContext } from '../../UserProvider';
import AddVendorForm from './AddVendor/AddVendorForm';
import EditVendorForm from './EditVendor/EditVendorForm';

const VendorTable = () => {
  const users = useContext(UserContext);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const perPage = 100;

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/vendor`, {
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

  const deleteVendor = async (id) => {
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

        const response = await axios.delete(`http://127.0.0.1:8000/api/vendor/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Delete Response:', response);
        setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== id));
        Swal.fire('Deleted!', 'The vendor has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting vendor:', error);
        Swal.fire('Error!', 'Failed to delete the vendor.', 'error');
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
  const filteredCarriers = vendors.filter((carrier) =>
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
    { key: 'legal_name', label: 'Legal Name' },
    { key: 'vendor_code', label: 'Code' },
    { key: 'vendor_type', label: 'Type' },
    { key: 'service', label: 'Service' },
    { key: 'primary_address', label: 'Address' },
    { key: 'primary_phone', label: 'Phone' },
    { key: 'primary_email', label: 'Email' },
    { key: 'scac', label: 'SCAC' },
    { key: 'ap_name', label: 'AP' },
    { key: 'ap_name', label: 'AR' },

    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteVendor(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

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

  return (
    <div>
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Vendors</h1>
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

      {/* Edit Vendor Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Vendor">
        {selectedVendor && <EditVendorForm vendor={selectedVendor} onClose={closeEditModal} onUpdate={updateVendor} />}
      </Modal>

      {/* Add Vendor Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Vendor">
        <AddVendorForm
          onClose={closeAddModal}
          onAddVendor={(newVendor) => {
            setVendors((prevVendors) => [...prevVendors, newVendor]);
            closeAddModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default VendorTable;

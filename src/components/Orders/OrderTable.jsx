import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import EditOrderForm from './EditOrder/EditOrderForm';
import AddOrderForm from './AddOrder/AddOrderForm';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true);
        const { data } = await axios.get(`${API_URL}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched orders:', data); // Log API response
        setOrders(data);
      } catch (error) {
        console.error('Error loading orders:', error);
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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

  const updateOrder = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === updatedOrder.id) {
          return {
            ...order,
            origin_location: updatedOrder.origin_location, // Avoid double stringifying
            destination_location: updatedOrder.destination_location,
            ...updatedOrder,
          };
        }
        return order;
      })
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((order) => order.id));
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
            axios.delete(`${API_URL}/order/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setOrders((prevOrders) => prevOrders.filter((order) => !selectedIds.includes(order.id)));
        setSelectedIds([]);
        Swal.fire('Deleted!', 'Selected orders have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting orders:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected orders.',
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

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedOrder(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (typeof valA === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedOrders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const headers = [
    {
      key: 'checkbox',
      label: <input type="checkbox" checked={selectedIds.length === paginatedData.length && paginatedData.length > 0} onChange={toggleSelectAll} />,
      render: (order) => <input type="checkbox" checked={selectedIds.includes(order.id)} onChange={() => toggleSelect(order.id)} />,
    },
    { key: 'customer', label: 'Customer' },
    { key: 'customer_ref_no', label: 'Ref no' },
    { key: 'customer_po_no', label: 'PO No' },
    { key: 'equipment', label: 'Equipment' },
    {
      key: 'origin',
      label: 'Origin',
      render: (order) => {
        try {
          const originLocations = typeof order.origin_location === 'string' ? JSON.parse(order.origin_location) : order.origin_location;
          return originLocations[0]?.city || '';
        } catch (error) {
          console.error('Error parsing origin_location:', error);
          return '';
        }
      },
    },
    {
      key: 'destination',
      label: 'Destination',
      render: (order) => {
        try {
          const destinationLocations =
            typeof order.destination_location === 'string' ? JSON.parse(order.destination_location) : order.destination_location;
          return destinationLocations[0]?.city || '';
        } catch (error) {
          console.error('Error parsing destination_location:', error);
          return '';
        }
      },
    },
    {
      key: 'pickup date',
      label: 'Pickup Date',
      render: (order) => {
        try {
          const originLocations = typeof order.origin_location === 'string' ? JSON.parse(order.origin_location) : order.origin_location;
          return originLocations[0]?.date || '';
        } catch (error) {
          console.error('Error parsing origin_location:', error);
          return '';
        }
      },
    },
    {
      key: 'pickup time',
      label: 'Pickup Time',
      render: (order) => {
        try {
          const originLocations = typeof order.origin_location === 'string' ? JSON.parse(order.origin_location) : order.origin_location;
          return originLocations[0]?.time || '';
        } catch (error) {
          console.error('Error parsing origin_location:', error);
          return '';
        }
      },
    },
    {
      key: 'pickup phone',
      label: 'Pickup Phone',
      render: (order) => {
        try {
          const originLocations = typeof order.origin_location === 'string' ? JSON.parse(order.origin_location) : order.origin_location;
          return originLocations[0]?.phone || '';
        } catch (error) {
          console.error('Error parsing origin_location:', error);
          return '';
        }
      },
    },
    {
      key: 'destination date',
      label: 'Delivery Date',
      render: (order) => {
        try {
          const destinationLocations =
            typeof order.destination_location === 'string' ? JSON.parse(order.destination_location) : order.destination_location;
          return destinationLocations[0]?.date || '';
        } catch (error) {
          console.error('Error parsing destination_location:', error);
          return '';
        }
      },
    },
    {
      key: 'destination time',
      label: 'Delivery Time',
      render: (order) => {
        try {
          const destinationLocations =
            typeof order.destination_location === 'string' ? JSON.parse(order.destination_location) : order.destination_location;
          return destinationLocations[0]?.time || '';
        } catch (error) {
          console.error('Error parsing destination_location:', error);
          return '';
        }
      },
    },
    {
      key: 'destination phone',
      label: 'Delivery Phone',
      render: (order) => {
        try {
          const destinationLocations =
            typeof order.destination_location === 'string' ? JSON.parse(order.destination_location) : order.destination_location;
          return destinationLocations[0]?.phone || '';
        } catch (error) {
          console.error('Error parsing destination_location:', error);
          return '';
        }
      },
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

  return (
    <div>
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Orders</h1>
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
                setCurrentPage(1); // Reset to the first page
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
          Delete&nbsp; <DeleteOutlined />
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div>No records found</div>
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

      {/* Modals */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Order">
        {selectedOrder && <EditOrderForm order={selectedOrder} onClose={closeEditModal} onUpdate={updateOrder} />}
      </Modal>
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Order">
        <AddOrderForm
          onClose={closeAddModal}
          onAddOrder={(newOrder) => {
            setOrders((prevOrders) => [...prevOrders, newOrder]);
            closeAddModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default OrderTable;

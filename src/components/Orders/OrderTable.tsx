import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, EyeOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import EditOrderForm from './EditOrder/EditOrderForm';
import AddOrderForm from './AddOrder/AddOrderForm';
import moment from 'moment';
import ViewOrderForm from './ViewOrder/ViewOrderForm';

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
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  var API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
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
            origin_location: updatedOrder.origin_location,
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

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedOrder(null);
  };
  const openViewModal = (order) => {
    setSelectedOrder(order);
    setViewModalOpen(true);
  };
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedOrder(null);
  };
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === 'delivery_date') {
      const destinationA = typeof a.destination_location === 'string' ? JSON.parse(a.destination_location) : a.destination_location || [];
      const destinationB = typeof b.destination_location === 'string' ? JSON.parse(b.destination_location) : b.destination_location || [];

      const dateA = moment(`${destinationA[0]?.date || ''} ${destinationA[0]?.time || ''}`, 'YYYY-MM-DD HH:mm');
      const dateB = moment(`${destinationB[0]?.date || ''} ${destinationB[0]?.time || ''}`, 'YYYY-MM-DD HH:mm');

      return sortDesc ? dateB.diff(dateA) : dateA.diff(dateB);
    }

    if (sortBy === 'pickup_date') {
      const originA = typeof a.origin_location === 'string' ? JSON.parse(a.origin_location) : a.origin_location || [];
      const originB = typeof b.origin_location === 'string' ? JSON.parse(b.origin_location) : b.origin_location || [];

      const dateA = moment(`${originA[0]?.date || ''} ${originA[0]?.time || ''}`, 'YYYY-MM-DD HH:mm');
      const dateB = moment(`${originB[0]?.date || ''} ${originB[0]?.time || ''}`, 'YYYY-MM-DD HH:mm');

      return sortDesc ? dateB.diff(dateA) : dateA.diff(dateB);
    }

    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (typeof valA === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedOrders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

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
      label: <input type="checkbox" checked={selectedIds.length === paginatedData.length && paginatedData.length > 0} onChange={toggleSelectAll} />,
      render: (order) => <input type="checkbox" checked={selectedIds.includes(order.id)} onChange={() => toggleSelect(order.id)} />,
    },
    { key: 'customer', label: 'Customer', render: (order) => order.customer || <span>-</span> },
    { key: 'customer_ref_no', label: 'Ref No', render: (order) => order.customer_ref_no || <span>-</span> },
    { key: 'customer_po_no', label: 'PO No', render: (order) => order.customer_po_no || <span>-</span> },
    { key: 'equipment', label: 'Equipment', render: (order) => order.equipment || <span>-</span> },
    {
      key: 'pickup_date',
      label: 'Pickup Date/Time',
      render: (order) => {
        try {
          const originLocations = typeof order.origin_location === 'string' ? JSON.parse(order.origin_location) : order.origin_location;
          const pickupDate = originLocations?.[0]?.date || null;
          const pickupTime = originLocations?.[0]?.time || null;

          return pickupDate && pickupTime ? (
            <div className="pickup-date-time">
              <CalendarOutlined /> {pickupDate} <ClockCircleOutlined /> {pickupTime}
            </div>
          ) : (
            <span>-</span>
          );
        } catch (error) {
          console.error('Error parsing pickup location data:', error);
          return <span>-</span>;
        }
      },
    },
    {
      key: 'delivery_date',
      label: 'Delivery Date/Time',
      render: (order) => {
        try {
          const destinationLocations =
            typeof order.destination_location === 'string' ? JSON.parse(order.destination_location) : order.destination_location;
          const deliveryDate = destinationLocations?.[0]?.date || null;
          const deliveryTime = destinationLocations?.[0]?.time || null;

          return deliveryDate && deliveryTime ? (
            <div className="delivery-date-time">
              <CalendarOutlined /> {deliveryDate} <ClockCircleOutlined /> {deliveryTime}
            </div>
          ) : (
            <span>-</span>
          );
        } catch (error) {
          console.error('Error parsing delivery location data:', error);
          return <span>-</span>;
        }
      },
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
  return (
    <div>
      <div className="header-container">
        <div className="header-container-left">
          <div className="header-actions">
            <h1 className="page-heading">Orders</h1>
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
          <button onClick={deleteSelected} className="delete-button">
            <DeleteOutlined />
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div>No records found</div>
      ) : (
        <Table
          data={paginatedData} // This should now contain sorted data
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
      <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Order Details">
        {selectedOrder && <ViewOrderForm order={selectedOrder} onClose={closeViewModal} />}
      </Modal>
    </div>
  );
};

export default OrderTable;

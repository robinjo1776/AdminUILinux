import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import EditUserForm from './EditUserForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddUserForm from './AddUserForm';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const perPage = 8;

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched Users:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // Optimistically update the UI
    await fetchUsers(); // Refetch updated users from the server
    closeAddModal();
  };

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You need to log in to access this resource.',
      });
    }
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const deleteUser = async (id) => {
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

        const response = await axios.delete(`${API_URL}/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Delete Response:', response);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting user:', error);

        if (error.response) {
          if (error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized',
              text: 'Your session has expired. Please log in again.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to delete the user.',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An unexpected error occurred.',
          });
        }
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

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    // Handle sorting for different data types
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle case where value is null or undefined
    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (sortBy === 'created_at' || sortBy === 'updated_at') {
      // Handle date sorting by comparing timestamps
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (typeof valA === 'string') {
      // Sort strings alphabetically
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    // Default number sorting
    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedUsers.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'created_at', label: 'Created At' },
    { key: 'updated_at', label: 'Updated At' },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteUser(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Users</h1>
          <button onClick={openAddModal} className="add-button">
            Add
          </button>
        </div>
        <div className="search-container">
          <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
        </div>
      </div>
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
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit User">
        {selectedUser && <EditUserForm selectedUser={selectedUser} onClose={closeEditModal} onUpdate={updateUser} />}
      </Modal>

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add User">
        <AddUserForm onClose={closeAddModal} onAddUser={handleAddUser} />
      </Modal>
    </div>
  );
};

export default UserTable;

import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Table, TableHeader } from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined, MailOutlined, PlusOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import AddVendorForm from './AddVendor/AddVendorForm';
import EditVendorForm from './EditVendor/EditVendorForm';
import ViewVendorForm from './ViewVendor/ViewVendorForm';
import { Vendor } from '../../types/VendorTypes';
import Pagination from '../common/Pagination';
import useVendorTable from '../../hooks/table/useVendorTable';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const VendorTable: React.FC = () => {
  const {
    vendors,
    loading,
    searchQuery,
    setSearchQuery,
    sortBy,
    sortDesc,
    selectedVendors,
    setSelectedVendors,
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
    isEditModalOpen,
    isAddModalOpen,
    isViewModalOpen,
    isEmailModalOpen,
    selectedVendor,
    setEditModalOpen,
    setAddModalOpen,
    setViewModalOpen,
    setEmailModalOpen,
    toggleSelectAll,
    toggleSelect,
    deleteSelected,
    openEditModal,
    emailData,
    setEmailData,
    sendEmails,
    openViewModal,
    handleSort,
    updateVendor,
    handlePageChange,
  } = useVendorTable();

  const renderSortableHeader = (header: TableHeader) => {
    if (header.key === 'checkbox' || header.key === 'actions') return header.label;
    return (
      <div className="sortable-header" onClick={() => handleSort(header.key)}>
        {header.label}
        <span className="sort-icon">{sortBy === header.key ? (sortDesc ? '▼' : '▲') : '▼'}</span>
      </div>
    );
  };

  const headers: TableHeader[] = [
    {
      key: 'checkbox',
      label: (
        <input type="checkbox" onChange={toggleSelectAll} checked={selectedVendors.length === paginatedData.length && paginatedData.length > 0} />
      ) as JSX.Element,
      render: (item: Vendor) => <input type="checkbox" checked={selectedVendors.includes(item.id)} onChange={() => toggleSelect(item.id)} />,
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
          <button onClick={() => setAddModalOpen(true)} className="add-button">
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
        />
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <Modal isOpen={isEditModalOpen} title="Edit Vendor" onClose={() => setEditModalOpen(false)}>
        {selectedVendor && <EditVendorForm vendor={selectedVendor} onUpdate={updateVendor} onClose={() => setEditModalOpen(false)} />}
      </Modal>

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Add Vendor">
        <AddVendorForm onClose={() => setAddModalOpen(false)} onAddVendor={(newCarrier) => updateVendor(newCarrier)} />
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
          <button type="submit" onClick={sendEmails}>
            Send
          </button>
        </div>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={() => setViewModalOpen(false)} title="Vendor Details">
        {selectedVendor && <ViewVendorForm vendor={selectedVendor} onClose={() => setViewModalOpen(false)} />}
      </Modal>
    </div>
  );
};

export default VendorTable;

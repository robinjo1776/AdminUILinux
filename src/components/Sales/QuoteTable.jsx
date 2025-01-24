import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import EditQuoteForm from './EditQuote/EditQuoteForm';

const QuoteTable = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuote, setSelectedQuote] = useState(null); // For editing a single quote
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({ subject: '', content: '' });
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token dynamically
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true); // Set loading to true before fetching
        const { data } = await axios.get(`${API_URL}/quote`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched Quotes:', data); // Debugging the fetched data
        setQuotes(data);
      } catch (error) {
        console.error('Error loading quotes:', error);
        handleFetchError(error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchQuotes();
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

  const updateQuote = (updatedQuote) => {
    setQuotes((prevQuotes) => prevQuotes.map((quote) => (quote.id === updatedQuote.id ? { ...quote, ...updatedQuote } : quote)));
  };

  const toggleSelectAll = () => {
    if (selectedQuotes.length === paginatedData.length) {
      setSelectedQuotes([]);
    } else {
      setSelectedQuotes(paginatedData.map((quote) => quote.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedQuotes((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]));
  };

  const deleteSelected = async () => {
    if (selectedQuotes.length === 0) {
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
          selectedQuotes.map((id) =>
            axios.delete(`${API_URL}/quote/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setQuotes((prevQuotes) => prevQuotes.filter((quote) => !selectedQuotes.includes(quote.id)));

        setSelectedQuotes([]); // Clear selected customers after deletion
        Swal.fire('Deleted!', 'Selected quotes have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting quotes:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected quotes.',
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

  const openEditModal = (quote) => {
    setSelectedQuote(quote);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedQuote(null);
  };

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredQuotes = quotes.filter((quote) =>
    Object.values(quote).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedQuotes = filteredQuotes.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (typeof valA === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedQuotes.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredQuotes.length / rowsPerPage);

  const headers = [
    {
      key: 'select',
      label: (
        <input type="checkbox" onChange={toggleSelectAll} checked={selectedQuotes.length === paginatedData.length && paginatedData.length > 0} />
      ),
      render: (item) => <input type="checkbox" checked={selectedQuotes.includes(item.id)} onChange={() => toggleSelect(item.id)} />,
    },
    { key: 'quote_customer', label: 'Customer' },
    { key: 'quote_cust_ref_no', label: 'Customer Ref#' },
    { key: 'quote_type', label: 'Type' },
    { key: 'quote_booked_by', label: 'Booked by' },
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

  const sendEmails = async (subject, content) => {
    if (selectedQuotes.length === 0) {
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
        ids: selectedQuotes,
        subject,
        content,
        module: 'quotes',
      };

      const response = await axios.post(`${API_URL}/email`, emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      Swal.fire('Success!', 'Emails have been sent.', 'success');
      setEmailModalOpen(false);
      setSelectedQuotes([]);
    } catch (error) {
      console.error('Error sending emails:', error.response ? error.response.data : error.message);
      Swal.fire('Error!', 'Failed to send emails.', 'error');
    }
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Quotes</h1>
        </div>
        <div className="search-container">
          <div className="search-input-wrapper">
            <SearchOutlined className="search-icon" />
            <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
          </div>
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
        <button onClick={deleteSelected} className="delete-button">
          Delete&nbsp;<DeleteOutlined />
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : quotes.length === 0 ? (
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
                    checked={selectedQuotes.length === paginatedData.length && paginatedData.length > 0}
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

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Quote">
        {selectedQuote ? (
          <EditQuoteForm quote={selectedQuote} onClose={closeEditModal} onUpdate={updateQuote} />
        ) : (
          <p>No quote selected for editing.</p>
        )}
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

export default QuoteTable;

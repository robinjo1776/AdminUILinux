import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined, MailOutlined } from '@ant-design/icons';
import EditQuoteForm from './EditQuote/EditQuoteForm';

const QuoteTable = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuoteIds, setSelectedQuoteIds] = useState([]); // For multiple selection
  const [selectedQuote, setSelectedQuote] = useState(null); // For editing a single quote
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({ subject: '', content: '' });
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const perPage = 100;

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

  const deleteQuote = async (id) => {
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

        const response = await axios.delete(`${API_URL}/quote/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Delete Response:', response);
        setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
        Swal.fire('Deleted!', 'The quote has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting quote:', error);

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
              text: 'Failed to delete the quote.',
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

  const paginatedData = sortedQuotes.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filteredQuotes.length / perPage);

  const headers = [
    {
      key: 'select',
      label: 'Select',
      render: (item) => <input type="checkbox" checked={selectedQuoteIds.includes(item.id)} onChange={() => toggleQuoteSelection(item.id)} />,
    },
    { key: 'quote_type', label: 'Type' },
    { key: 'quote_customer', label: 'Customer' },
    { key: 'quote_cust_ref_no', label: 'Customer Ref#' },
    { key: 'quote_booked_by', label: 'Booked by' },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteQuote(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  const toggleQuoteSelection = (id) => {
    setSelectedQuoteIds((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((quoteId) => quoteId !== id) : [...prevSelected, id]));
  };

  const sendEmails = async (subject, content) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const emailData = {
        ids: selectedQuoteIds,
        subject,
        content,
        module: 'quotes',
      };

      const response = await axios.post('http://127.0.0.1:8000/api/email', emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Email Response:', response);
      Swal.fire('Success!', 'Emails have been sent.', 'success');
      setEmailModalOpen(false);
      setSelectedQuoteIds([]);
    } catch (error) {
      console.error('Error sending emails:', error.response ? error.response.data : error.message);
      Swal.fire('Error!', 'Failed to send emails.', 'error');
    }
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-actions">
          <h1 className="page-heading">Customer quotes</h1>
        </div>
        <button onClick={() => setEmailModalOpen(true)} className="send-email-button" disabled={selectedQuoteIds.length === 0}>
          Email <MailOutlined />
        </button>
        <div className="search-container">
          <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search quotes..." />
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

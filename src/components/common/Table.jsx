import PropTypes from 'prop-types';
import { LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'; // Import Ant Design icons
import '../../styles/Table.css';
import '../../styles/Badge.css';
import '../../styles/Button.css';
import '../../styles/Pagination.css';
import '../../styles/Search.css';
import '../../styles/Sidebar.css';

const Table = ({ data, headers, handleSort, sortBy, sortDesc, currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key} style={{ width: header.width || 'auto' }} onClick={() => handleSort(header.key)} className="col">
                  <div className="header-content">
                    {header.label}
                    <i className={`fa ${sortBy === header.key && !sortDesc ? 'fa-sort-up' : 'fa-sort'}`}></i>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {headers.map((header) => (
                  <td key={header.key} className="data-row">
                    {header.render ? header.render(item) : item[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
          <button className="first-page" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            <DoubleLeftOutlined /> {/* Double Chevron for First Page */}
          </button>

          <button className="previous" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            <LeftOutlined /> {/* Single Chevron for Previous Page */}
          </button>

          {/* Page Number Dropdown */}
          <select className="page-dropdown" value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))}>
            {[...Array(totalPages).keys()].map((page) => (
              <option key={page + 1} value={page + 1}>
                {page + 1}
              </option>
            ))}
          </select>

          <button className="next" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            <RightOutlined /> {/* Single Chevron for Next Page */}
          </button>

          <button className="last-page" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
            <DoubleRightOutlined /> {/* Double Chevron for Last Page */}
          </button>
        </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  handleSort: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Table;

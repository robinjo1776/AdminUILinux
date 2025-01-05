import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import '../../styles/Table.css';

const Table = ({ data, headers, handleSort, sortBy, sortDesc, currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr className="header-row">
            {headers.map((header) => (
              <th key={header.key} onClick={() => handleSort(header.key)} className="col">
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
      <div className="pagination">
        <div className="pagination-controls">
          <button className="previous" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            <LeftOutlined />
          </button>
          <span>
            &nbsp;{currentPage} of {totalPages}&nbsp;
          </span>
          <button className="next" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            <RightOutlined />
          </button>
        </div>
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

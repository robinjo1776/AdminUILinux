import { DeleteOutlined } from '@ant-design/icons';

function CarrierLane({ lane, index, handleLaneChange, handleRemoveLane }) {
  const locations = [
    'AB',
    'AK',
    'AL',
    'AR',
    'AZ',
    'BC',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'IA',
    'ID',
    'IL',
    'IN',
    'KS',
    'KY',
    'LA',
    'MA',
    'MB',
    'MD',
    'ME',
    'MI',
    'MN',
    'MO',
    'MS',
    'MT',
    'NB',
    'NC',
    'ND',
    'NE',
    'NH',
    'NJ',
    'NL',
    'NM',
    'NS',
    'NV',
    'NY',
    'OH',
    'OK',
    'ON',
    'OR',
    'PA',
    'PE',
    'QC',
    'RI',
    'SC',
    'SD',
    'SK',
    'TN',
    'TX',
    'UT',
    'VA',
    'VT',
    'WA',
    'WI',
    'WV',
    'WY',
  ];

  return (
    <fieldset className="form-section">
      <div className="contact-form">
        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="fromLane">From</label>
            <select id="fromLane" name="from" value={lane.from || ''} onChange={handleLaneChange}>
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="toLane">To</label>
            <select id="toLane" name="to" value={lane.to || ''} onChange={handleLaneChange}>
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={() => handleRemoveLane(index)} className="remove">
            <DeleteOutlined />
          </button>
        </div>
      </div>
    </fieldset>
  );
}

export default CarrierLane;

import { DeleteOutlined } from '@ant-design/icons';

interface Lane {
  from: string;
  to: string;
}

interface CarrierLaneProps {
  lane: Lane;
  index: number;
  handleLaneChange: (index: number, event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleRemoveLane: (index: number) => void;
}

const CarrierLane: React.FC<CarrierLaneProps> = ({ lane, index, handleLaneChange, handleRemoveLane }) => {
  const locations: string[] = [
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
            <label htmlFor={`fromLane-${index}`}>From</label>
            <select id={`fromLane-${index}`} value={lane.from || ''} onChange={(event) => handleLaneChange(index, event)}>
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
            <label htmlFor={`toLane-${index}`}>To</label>
            <select id={`toLane-${index}`} value={lane.to || ''} onChange={(event) => handleLaneChange(index, event)}>
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
};

export default CarrierLane;

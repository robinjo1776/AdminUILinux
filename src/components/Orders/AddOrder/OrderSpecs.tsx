import React from 'react';

interface Order {
  hot: boolean;
  team: boolean;
  air_ride: boolean;
  tarp: boolean;
  hazmat: boolean;
}

interface OrderSpecsProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
}

const OrderSpecs: React.FC<OrderSpecsProps> = ({ order, setOrder }) => {
  return (
    <fieldset className="form-section">
      <legend>Load Specifications</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {[
          { id: 'hot', label: 'Hot' },
          { id: 'team', label: 'Team' },
          { id: 'air_ride', label: 'Air Ride' },
          { id: 'tarp', label: 'TARP' },
          { id: 'hazmat', label: 'Hazmat' },
        ].map(({ id, label }) => (
          <div className="form-group" style={{ flex: 1 }} key={id}>
            <label
              htmlFor={id}
              style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }}
            >
              {label}
              <input
                type="checkbox"
                id={id}
                checked={order[id as keyof Order]}
                onChange={(e) => setOrder((prevOrder) => ({ ...prevOrder, [id]: e.target.checked }))}
              />
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default OrderSpecs;

import React from 'react';
import { Order, Charge } from '../../types/OrderTypes';

interface OrderChargeProps {
  setFormOrder: React.Dispatch<React.SetStateAction<Order>>;
  order: Order;
  charge: Charge;
  index: number;
  onChange: (index: number, updatedCharge: Charge) => void;
  onRemove: (index: number) => void;
}

const OrderCharge: React.FC<OrderChargeProps> = ({ charge, index, onChange, onRemove }) => {
  const rateOptions = ['Flat', 'Percentage'];

  const handleChargeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedCharge = {
      ...charge,
      [name]: name === 'charge' ? Number(value) : value,
    };
    onChange(index, updatedCharge);
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Type</label>
        <input type="text" name="type" value={charge?.type || ''} onChange={handleChargeChange} />
      </div>
      <div className="form-group">
        <label>Charge</label>
        <input type="number" name="charge" value={charge?.charge || ''} onChange={handleChargeChange} />
      </div>
      <div className="form-group">
        <label htmlFor="percent">Percent/Flat Rate</label>
        <select name="percent" value={charge?.percent || ''} onChange={handleChargeChange}>
          <option value="">Select...</option>
          {rateOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={() => onRemove(index)} className="remove">
        Remove
      </button>
    </div>
  );
};

export default OrderCharge;

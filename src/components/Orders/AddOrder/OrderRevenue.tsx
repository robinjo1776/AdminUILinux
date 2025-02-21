import React from 'react';

interface Order {
  currency: string;
  base_price: string;
}

interface OrderRevenueProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
}

const OrderRevenue: React.FC<OrderRevenueProps> = ({ order, setOrder }) => {
  const currencyOptions = ['CAD', 'USD'];

  return (
    <fieldset className="form-section">
      <legend>Revenue</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="currency">Currency</label>
          <select
            name="currency"
            value={order.currency}
            onChange={(e) =>
              setOrder((prevOrder) => ({
                ...prevOrder,
                currency: e.target.value,
              }))
            }
          >
            <option value="">Select...</option>
            {currencyOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="basePrice">Base Price</label>
          <input
            type="text"
            id="basePrice"
            value={order.base_price}
            onChange={(e) =>
              setOrder((prevOrder) => ({
                ...prevOrder,
                base_price: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OrderRevenue;

import React from 'react';
import { Order } from '../../../types/OrderTypes';

interface OrderShipmentProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
}

const OrderShipment: React.FC<OrderShipmentProps> = ({ order, setOrder }) => {
  const equipmentOptions = ["Dry Van 53'", "Flat Bed 53'", "Reefer 53'"];
  const loadTypeOptions = ['Partial', 'FTL', 'LTL'];

  return (
    <fieldset className="form-section">
      <legend>Shipment</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="commodity">Commodity</label>
          <input
            type="text"
            id="commodity"
            value={order.commodity}
            onChange={(e) => setOrder((prevOrder) => ({ ...prevOrder, commodity: e.target.value }))}
            placeholder="Commodity"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="equipment">Equipment</label>
          <select id="equipment" value={order.equipment} onChange={(e) => setOrder((prevOrder) => ({ ...prevOrder, equipment: e.target.value }))}>
            <option value="">Select...</option>
            {equipmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="loadType">Load Type</label>
          <select id="loadType" value={order.load_type} onChange={(e) => setOrder((prevOrder) => ({ ...prevOrder, load_type: e.target.value }))}>
            <option value="">Select...</option>
            {loadTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="temperature">Temperature</label>
          <input
            type="number"
            id="temperature"
            value={order.temperature}
            onChange={(e) =>
              setOrder((prevOrder) => ({
                ...prevOrder,
                temperature: Number(e.target.value), // Convert to number
              }))
            }
            placeholder="Temperature"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OrderShipment;

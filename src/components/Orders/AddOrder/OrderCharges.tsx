import { DeleteOutlined } from '@ant-design/icons';
import { Order, Charge } from '../../../types/OrderTypes';

interface OrderChargesProps {
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  order: Order;
  charge: Charge;
  index: number;
  handleChargeChange: (index: number, updatedCharge: Charge) => void;
  handleRemoveCharge: (index: number) => void;
}

const OrderCharges: React.FC<OrderChargesProps> = ({ setOrder, charge, index, handleRemoveCharge }) => {
  const rateOptions = ['Flat', 'Percentage'];

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setOrder((prevOrder) => ({
      ...prevOrder,
      charges: prevOrder.charges.map((loc, idx) => (idx === index ? { ...loc, [name]: value } : loc)),
    }));
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Type</label>
        <input type="text" name="type" value={charge.type || ''} onChange={handleOrderChange} />
      </div>
      <div className="form-group">
        <label>Charge</label>
        <input type="number" name="charge" value={charge.charge || ''} onChange={handleOrderChange} />
      </div>
      <div className="form-group">
        <label htmlFor="percent">Percent/Flat Rate</label>
        <select name="percent" value={charge.percent || ''} onChange={handleOrderChange}>
          <option value="">Select..</option>
          {rateOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={() => handleRemoveCharge(index)} className="remove">
        <DeleteOutlined />
      </button>
    </div>
  );
};

export default OrderCharges;

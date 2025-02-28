import { DeleteOutlined } from '@ant-design/icons';
import { ChangeEvent } from 'react';
import { Order, Charge } from '../../../types/OrderTypes';

interface OrderDiscountsProps {
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  order: Order;
  discount: Charge;
  index: number;
  handleDiscountChange: (index: number, updatedDiscount: Charge) => void;
  handleRemoveDiscount: (index: number) => void;
}

const OrderDiscounts: React.FC<OrderDiscountsProps> = ({ setOrder, discount, index, handleRemoveDiscount }) => {
  const rateOptions = ['Flat', 'Percentage'];

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setOrder((prevOrder) => ({
      ...prevOrder,
      discounts: prevOrder.discounts.map((loc, idx) => (idx === index ? { ...loc, [name]: value } : loc)),
    }));
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Type</label>
        <input type="text" name="type" value={discount.type || ''} onChange={handleOrderChange} />
      </div>
      <div className="form-group">
        <label>Charge</label>
        <input type="number" name="charge" value={discount.charge || 0} onChange={handleOrderChange} />
      </div>
      <div className="form-group">
        <label htmlFor="percent">Percent/Flat Rate</label>
        <select name="percent" value={discount.percent || ''} onChange={handleOrderChange}>
          <option value="">Select..</option>
          {rateOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={() => handleRemoveDiscount(index)} className="remove">
        <DeleteOutlined />
      </button>
    </div>
  );
};

export default OrderDiscounts;

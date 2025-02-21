import '../../../styles/Form.css';
import OrderGeneral from './OrderGeneral';
import OrderShipment from './OrderShipment';
import OrderOrigin from './OrderOrigin';
import OrderDestination from './OrderDestination';
import OrderSpecs from './OrderSpecs';
import OrderRevenue from './OrderRevenue';
import OrderCharges from './OrderCharges';
import OrderDiscounts from './OrderDiscounts';
import OrderTax from './OrderTax';
import { PlusOutlined } from '@ant-design/icons';
import { useAddOrder } from '../../../hooks/add/useAddOrder';
import { Order } from '../../../types/OrderTypes';

interface AddOrderFormProps {
  onClose: () => void;
  onAddOrder: (order: Order) => void;
}

const AddOrderForm: React.FC<AddOrderFormProps> = ({ onClose, onAddOrder }) => {
  const {
    order,
    setOrder,
    handleSubmit,
    clearOrderForm,
    handleOriginChange,
    handleDestinationChange,
    handleChargeChange,
    handleDiscountChange,
    handleRemoveOrigin,
    handleRemoveDestination,
    handleRemoveCharge,
    handleRemoveDiscount,
  } = useAddOrder(onClose, onAddOrder);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <OrderGeneral order={order} setOrder={setOrder} />
        <OrderShipment order={order} setOrder={setOrder} />
        <fieldset className="form-section">
          <legend>Origin</legend>
          <hr />
          <div className="form-row">
            {order.origin_location.map((origin, index) => (
              <OrderOrigin
                key={index}
                origin={origin}
                index={index}
                handleOriginChange={handleOriginChange}
                handleRemoveOrigin={handleRemoveOrigin}
              />
            ))}
            <button type="button" onClick={handleAddOrigin} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Destination</legend>
          <hr />
          <div className="form-row">
            {order.destination_location.map((destination, index) => (
              <OrderDestination
                key={index}
                destination={destination}
                index={index}
                handleDestinationChange={handleDestinationChange}
                handleRemoveDestination={handleRemoveDestination}
              />
            ))}
            <button type="button" onClick={handleAddDestination} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <OrderSpecs order={order} setOrder={setOrder} />
        <OrderRevenue order={order} setOrder={setOrder} />
        <fieldset className="form-section">
          <legend>Charges</legend>
          <hr />
          <div className="form-row">
            {order.charges.map((charge, index) => (
              <OrderCharges
                key={index}
                charge={charge}
                index={index}
                handleChargeChange={handleChargeChange}
                handleRemoveCharge={handleRemoveCharge}
              />
            ))}
            <button type="button" onClick={handleAddCharge} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Discounts</legend>
          <hr />
          <div className="form-row">
            {order.discounts.map((discount, index) => (
              <OrderDiscounts
                key={index}
                discount={discount}
                index={index}
                handleDiscountChange={handleDiscountChange}
                handleRemoveDiscount={handleRemoveDiscount}
              />
            ))}
            <button type="button" onClick={handleAddDiscount} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <OrderTax order={order} setOrder={setOrder} />

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Generate Order
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrderForm;

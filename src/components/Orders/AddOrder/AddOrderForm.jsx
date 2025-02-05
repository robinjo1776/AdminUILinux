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
import addOrderHandler from './addOrderHandler';
import addFieldMultiple from './addFieldMultiple';

const AddOrderForm = ({ onClose, onAddOrder }) => {
  const { order, setOrder, handleSubmit } = addOrderHandler({ onClose, onAddOrder });

  const {
    handleOriginChange,
    handleDestinationChange,
    handleChargeChange,
    handleDiscountChange,
    handleRemoveOrigin,
    handleRemoveDestination,
    handleRemoveCharge,
    handleRemoveDiscount,
  } = addFieldMultiple();

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <OrderGeneral order={order} setOrder={setOrder} />
        <OrderShipment order={order} setOrder={setOrder} />
        <fieldset className="form-section">
          <legend>Origin</legend>
          <div className="form-row">
            {order.origin_location.map((origin, index) => (
              <OrderOrigin
                key={index}
                order={order}
                setOrder={setOrder}
                origin={origin}
                index={index}
                onChange={handleOriginChange}
                onRemove={handleRemoveOrigin}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setOrder((prevOrder) => ({
                  ...prevOrder,
                  origin_location: [
                    ...prevOrder.origin_location,
                    {
                      address: '',
                      city: '',
                      state: '',
                      country: '',
                      postal: '',
                      date: '',
                      time: '',
                      po: '',
                      phone: '',
                      notes: '',
                      packages: '',
                      weight: '',
                      dimensions: '',
                    },
                  ],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Destination</legend>
          <div className="form-row">
            {order.destination_location.map((destination, index) => (
              <OrderDestination
                key={index}
                order={order}
                setOrder={setOrder}
                destination={destination}
                index={index}
                onChange={handleDestinationChange}
                onRemove={handleRemoveDestination}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setOrder((prevOrder) => ({
                  ...prevOrder,
                  destination_location: [
                    ...prevOrder.destination_location,
                    {
                      address: '',
                      city: '',
                      state: '',
                      country: '',
                      postal: '',
                      date: '',
                      time: '',
                      po: '',
                      phone: '',
                      notes: '',
                      packages: '',
                      weight: '',
                      dimensions: '',
                    },
                  ],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <OrderSpecs order={order} setOrder={setOrder} />
        <OrderRevenue order={order} setOrder={setOrder} />

        <fieldset className="form-section">
          <legend>Charges</legend>
          <div className="form-row">
            {order.charges.map((charge, index) => (
              <OrderCharges
                key={index}
                order={order}
                setOrder={setOrder}
                charge={charge}
                index={index}
                onChange={handleChargeChange}
                onRemove={handleRemoveCharge}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setOrder((prevOrder) => ({
                  ...prevOrder,
                  charges: [...prevOrder.charges, { type: '', charge: '', percent: '' }],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Discounts</legend>
          <div className="form-row">
            {order.discounts.map((discount, index) => (
              <OrderDiscounts
                key={index}
                order={order}
                setOrder={setOrder}
                discount={discount}
                index={index}
                onChange={handleDiscountChange}
                onRemove={handleRemoveDiscount}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setOrder((prevOrder) => ({
                  ...prevOrder,
                  discounts: [...prevOrder.discounts, { type: '', charge: '', percent: '' }],
                }))
              }
              className="add-button"
            >
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

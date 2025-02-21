import EditOrderGeneral from './EditOrderGeneral';
import EditOrderShipment from './EditOrderShipment';
import EditOrderOrigin from './EditOrderOrigin';
import EditOrderDestination from './EditOrderDestination';
import EditOrderSpecs from './EditOrderSpecs';
import EditOrderRevenue from './EditOrderRevenue';
import EditOrderCharges from './EditOrderCharges';
import EditOrderDiscounts from './EditOrderDiscounts';
import EditOrderTax from './EditOrderTax';
import { PlusOutlined } from '@ant-design/icons';
import useOrderHandler from './useOrderHandler';
import useOrderDetails from './useOrderDetails';

const EditOrderForm = ({ order, onClose, onUpdate }) => {
  const { formOrder, setFormOrder, updateOrder } = useOrderHandler({ order, onClose, onUpdate });

  const {
    handleOriginChange,
    handleDestinationChange,
    handleChargeChange,
    handleDiscountChange,
    handleRemoveOrigin,
    handleRemoveDestination,
    handleRemoveCharge,
    handleRemoveDiscount,
  } = useOrderDetails();

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateOrder();
        }}
        className="form-main"
      >
        <EditOrderGeneral formOrder={formOrder} setFormOrder={setFormOrder} />
        <EditOrderShipment formOrder={formOrder} setFormOrder={setFormOrder} />
        <fieldset className="form-section">
          <legend>Origin</legend>
          <div className="form-row">
            {formOrder.origin_location.map((origin, index) => (
              <EditOrderOrigin
                key={index}
                formOrder={formOrder}
                setFormOrder={setFormOrder}
                origin={origin}
                index={index}
                onChange={handleOriginChange}
                onRemove={handleRemoveOrigin}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormOrder((prevOrder) => ({
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
            {formOrder.destination_location.map((destination, index) => (
              <EditOrderDestination
                key={index}
                formOrder={formOrder}
                setFormOrder={setFormOrder}
                destination={destination}
                index={index}
                onChange={handleDestinationChange}
                onRemove={handleRemoveDestination}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormOrder((prevOrder) => ({
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
        <EditOrderSpecs formOrder={formOrder} setFormOrder={setFormOrder} />
        <EditOrderRevenue formOrder={formOrder} setFormOrder={setFormOrder} />

        <fieldset className="form-section">
          <legend>Charges</legend>
          <div className="form-row">
            {formOrder.charges.map((charge, index) => (
              <EditOrderCharges
                key={index}
                formOrder={formOrder}
                setFormOrder={setFormOrder}
                charge={charge}
                index={index}
                onChange={handleChargeChange}
                onRemove={handleRemoveCharge}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormOrder((prevOrder) => ({
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
            {formOrder.discounts.map((discount, index) => (
              <EditOrderDiscounts
                key={index}
                formOrder={formOrder}
                setFormOrder={setFormOrder}
                discount={discount}
                index={index}
                onChange={handleDiscountChange}
                onRemove={handleRemoveDiscount}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormOrder((prevOrder) => ({
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
        <EditOrderTax formOrder={formOrder} setFormOrder={setFormOrder} />
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrderForm;

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
import { Order, Location, Charge } from '../../../types/OrderTypes';
import useEditOrder from '../../../hooks/edit/useEditOrder';

interface EditOrderFormProps {
  order: Order;
  onClose: () => void;
  onUpdate: () => void;
}

function EditOrderForm({ order, onClose, onUpdate }: EditOrderFormProps) {
  const {
    formOrder,
    setFormOrder,
    updateOrder,
    handleAddItem,
    handleItemChange,
    handleRemoveItem,
    handleAddChargeOrDiscount,
    handleChangeChargeOrDiscount,
    handleRemoveChargeOrDiscount,
  } = useEditOrder({ order, onClose, onUpdate });

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
            {formOrder.origin_location?.map((origin, index) => (
              <EditOrderOrigin
                key={index}
                origin_location={formOrder.origin_location}
                index={index}
                onAddOrigin={handleAddOrigin}
                handleRemoveOrigin={handleRemoveOrigin}
                handleOriginChange={handleOriginChange}
              />
            ))}
            <button type="button" onClick={handleAddOrigin} className="add-button">
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
                destination={destination}
                index={index}
                onChange={handleItemChange}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
            <button type="button" onClick={handleAddItem} className="add-button">
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
                charge={charge}
                index={index}
                onChandleChangeChargeOrDiscounthange={handleChangeChargeOrDiscount}
                handleRemoveChargeOrDiscount={handleRemoveChargeOrDiscount}
              />
            ))}
            <button type="button" onClick={handleAddChargeOrDiscount} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <EditOrderDiscounts />
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
}

export default EditOrderForm;

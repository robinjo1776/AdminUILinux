import { Order } from '../../../types/OrderTypes';

interface EditOrderShipmentProps {
  formOrder: Order;
  setFormOrder: React.Dispatch<React.SetStateAction<Order>>;
}

function EditOrderShipment({ formOrder, setFormOrder }: EditOrderShipmentProps) {
  const equipmentOptions = ["Dry Van 53'", "Flat Bed 53'", "Reefer 53'"];
  const loadTypeOptions = ['Partial', 'FTL', 'LTL'];

  // Generic handler for input changes
  const handleChange = (field: keyof Order, value: string | number) => {
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      [field]: value,
    }));
  };

  return (
    <fieldset className="form-section">
      <legend>Shipment</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="commodity">Commodity</label>
          <input
            type="text"
            id="commodity"
            name="commodity"
            value={formOrder.commodity}
            onChange={(e) => handleChange('commodity', e.target.value)}
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="equipment">Equipment</label>
          <select id="equipment" name="equipment" value={formOrder.equipment} onChange={(e) => handleChange('equipment', e.target.value)}>
            <option value="">Select...</option>
            {equipmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="load_type">Load Type</label>
          <select id="load_type" name="load_type" value={formOrder.load_type} onChange={(e) => handleChange('load_type', e.target.value)}>
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
            name="temperature"
            value={formOrder.temperature}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderShipment;

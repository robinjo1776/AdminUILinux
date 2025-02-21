type EditOrderShipmentProps = {
  formOrder: {
    commodity: string;
    equipment: string;
    load_type: string;
    temperature: string;
  };
  setFormOrder: (updateFn: (prevOrder: any) => any) => void;
};

const EditOrderShipment: React.FC<EditOrderShipmentProps> = ({ formOrder, setFormOrder }) => {
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
            name="commodity"
            value={formOrder.commodity}
            onChange={(e) =>
              setFormOrder((prevOrder) => ({
                ...prevOrder,
                commodity: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="equipment">Equipment</label>
          <select
            id="equipment"
            name="equipment"
            value={formOrder.equipment}
            onChange={(e) =>
              setFormOrder((prevOrder) => ({
                ...prevOrder,
                equipment: e.target.value,
              }))
            }
          >
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
          <select
            id="load_type"
            name="load_type"
            value={formOrder.load_type}
            onChange={(e) =>
              setFormOrder((prevOrder) => ({
                ...prevOrder,
                load_type: e.target.value,
              }))
            }
          >
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
            type="text"
            id="temperature"
            name="temperature"
            value={formOrder.temperature}
            onChange={(e) =>
              setFormOrder((prevOrder) => ({
                ...prevOrder,
                temperature: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </fieldset>
  );
};

export default EditOrderShipment;

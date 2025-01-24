import { DeleteOutlined } from '@ant-design/icons';
function CarrierEquipment({ equipment, index, handleEquipmentChange, handleRemoveEquipment }) {
  const equipmentType = ["Dry Van 53'", "Reefer 53'", "Flatbed 53'"];
  return (
    <fieldset className="form-section">
      <div className="contact-form">
        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1, width: '23.3rem' }}>
            <label htmlFor="customerType">Equipment Type</label>
            <select id="customerType" value={equipment.equipment || ''} onChange={handleEquipmentChange}>
              {equipmentType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="button" onClick={() => handleRemoveEquipment(index)} className="remove">
          <DeleteOutlined />
        </button>
      </div>
    </fieldset>
  );
}

export default CarrierEquipment;

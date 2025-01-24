import { DeleteOutlined } from '@ant-design/icons';
function CustomerEquipment({ equipment, index, handleEquipmentChange, handleRemoveEquipment }) {
  const equipmentType = ['Van', 'Reefer', 'Flatbed', 'Triaxle', 'Maxi', 'Btrain', 'Roll tite'];
  return (
    <fieldset className="form-section">
      <div className="contact-form">
        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1, width: '23.3rem' }}>
            <label htmlFor="customerType">Equipment Type</label>
            <select
              id="customerType"
              value={equipment.equipment || ''}
              onChange={(e) => handleEquipmentChange(index, { ...equipment, name: e.target.value })}
            >
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

export default CustomerEquipment;

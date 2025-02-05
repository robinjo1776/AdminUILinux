import { DeleteOutlined } from '@ant-design/icons';
function CustomerEquipment({ setformCustomer, order, equipment = {}, index, onRemove }) {
  const equipmentType = ['Van', 'Reefer', 'Flatbed', 'Triaxle', 'Maxi', 'Btrain', 'Roll tite'];
  const handleEquipmentChange = (e) => {
    const { name, value } = e.target;

    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_equipment: prevCustomer.cust_equipment.map((loc, idx) => (idx === index ? { ...loc, [name]: value } : loc)),
    }));
  };
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
        <button type="button" onClick={() => onRemove(index)} className="remove">
          <DeleteOutlined />
        </button>
      </div>
    </fieldset>
  );
}

export default CustomerEquipment;

function CarrierEquipment({ equipment = {}, index, onChange, onRemove }) {
    const handleEquipmentChange = (e) => {
      const { name, value } = e.target;
      // Update contact with the new value
      const updatedEquipment = { ...equipment, [name]: value };
      onChange(index, updatedEquipment); // Inform parent component to update state
    };
    const equipmentType = [
      "Dry Van 53'",
      "Reefer 53'",
      "Flatbed 53'",
    ];
    return (
      <div className="contact-entry">
        <div className="form-group">
          <label htmlFor="customerType">Equipment Type</label>
          <select
            id="customerType"
            value={equipment.equipment || ""}
            onChange={handleEquipmentChange}
          >
            {equipmentType.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
  
        <button type="button" onClick={() => onRemove(index)} className="remove">
          Remove
        </button>
      </div>
    );
  }
  
  export default CarrierEquipment;
  
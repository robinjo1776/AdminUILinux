import { DeleteOutlined } from '@ant-design/icons';

interface Equipment {
  equipment: string;
}

interface CarrierEquipmentProps {
  equipment: Equipment;
  index: number;
  handleEquipmentChange: (index: number, event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleRemoveEquipment: (index: number) => void;
}

const CarrierEquipment: React.FC<CarrierEquipmentProps> = ({ equipment, index, handleEquipmentChange, handleRemoveEquipment }) => {
  const equipmentType: string[] = ["Dry Van 53'", "Reefer 53'", "Flatbed 53'"];

  return (
    <fieldset className="form-section">
      <div className="contact-form">
        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1, width: '23.3rem' }}>
            <label htmlFor={`equipmentType-${index}`}>Equipment Type</label>
            <select
              id={`equipmentType-${index}`}
              value={equipment.equipment || ''}
              onChange={(event) => handleEquipmentChange(index, event)}
            >
              {' '}
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
};

export default CarrierEquipment;

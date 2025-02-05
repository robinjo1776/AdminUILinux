import { DeleteOutlined } from '@ant-design/icons';

function ViewCarrierEquipment({ equipment, index, handleRemoveEquipment }) {
  return (
    <fieldset className="form-section">
      <div className="contact-form">
        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1, width: '23.3rem' }}>
            <label htmlFor="customerType">Equipment Type</label>
            <span>{equipment.equipment || 'N/A'}</span>
          </div>
        </div>

      </div>
    </fieldset>
  );
}

export default ViewCarrierEquipment;

import { DeleteOutlined } from '@ant-design/icons';

function ViewCustomerEquipment({ equipment = {}, index,}) {
  const equipmentType = ['Van', 'Reefer', 'Flatbed', 'Triaxle', 'Maxi', 'Btrain', 'Roll tite'];

  return (
    <fieldset className="form-section">
      <div className="contact-form">
        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1, width: '23.3rem' }}>
            <label>Equipment Type</label>
            <div>{equipment.equipment || ''}</div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewCustomerEquipment;

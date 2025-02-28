import { PlusOutlined } from '@ant-design/icons';
import '../../../styles/Form.css';
import General from './General';
import CarrierDetails from './CarrierDetails';
import LiabilityInsurance from './LiabilityInsurance';
import CargoInsurance from './CargoInsurance';
import PrimaryAddress from './PrimaryAddress';
import MailingAddress from './MailingAddress';
import InternalNotes from './InternalNotes';
import CarrierContact from '../CarrierContact';
import CarrierEquipment from '../CarrierEquipment';
import CarrierLane from '../CarrierLane';
import { Carrier } from '../../../types/CarrierTypes';
import { useAddCarrier } from '../../../hooks/add/useAddCarrier';

interface AddCarrierFormProps {
  onClose: () => void;
  onAddCarrier: (carrier: Carrier) => void;
}

const AddCarrierForm: React.FC<AddCarrierFormProps> = ({ onClose, onAddCarrier }) => {
  const {
    carrier,
    setCarrier,
    handleSubmit,
    handleAddContact,
    handleAddEquipment,
    handleAddLane,
    handleContactChange,
    handleRemoveContact,
    handleEquipmentChange,
    handleRemoveEquipment,
    handleLaneChange,
    handleRemoveLane,
  } = useAddCarrier(onClose, onAddCarrier);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} data-testid="carrier-form">
        <General carrier={carrier} setCarrier={setCarrier} />
        <CarrierDetails carrier={carrier} setCarrier={setCarrier} />
        <LiabilityInsurance carrier={carrier} setCarrier={setCarrier} />
        <CargoInsurance carrier={carrier} setCarrier={setCarrier} />
        <PrimaryAddress carrier={carrier} setCarrier={setCarrier} />
        <MailingAddress carrier={carrier} setCarrier={setCarrier} />
        <InternalNotes carrier={carrier} setCarrier={setCarrier} />

        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {carrier.contact.map((contact, index) => (
              <CarrierContact
                key={index}
                contact={contact}
                index={index}
                handleContactChange={handleContactChange}
                handleRemoveContact={handleRemoveContact}
              />
            ))}
            <button type="button" onClick={handleAddContact} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Equipment</legend>
          <div className="form-row">
            {carrier.equipment.map((equipment, index) => (
              <CarrierEquipment
                key={index}
                equipment={equipment}
                index={index}
                handleEquipmentChange={handleEquipmentChange}
                handleRemoveEquipment={handleRemoveEquipment}
              />
            ))}
            <button type="button" onClick={handleAddEquipment} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Lanes</legend>
          <div className="form-row">
            {carrier.lane.map((lane, index) => (
              <CarrierLane key={index} lane={lane} index={index} handleLaneChange={handleLaneChange} handleRemoveLane={handleRemoveLane} />
            ))}
            <button type="button" onClick={handleAddLane} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <div className="form-actions">
        <button type="submit" className="btn-submit" data-testid="submit-button">
  Add Carrier
</button>

          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarrierForm;

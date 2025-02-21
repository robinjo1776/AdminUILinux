import '../../../styles/Form.css';
import BrokerDetails from './BrokerDetails';
import { Broker } from '../../../types/BrokerTypes';
import { useAddBroker } from '../../../hooks/add/useAddBroker';

interface AddBrokerFormProps {
  onClose: () => void;
  onAddBroker: (broker: Broker) => void;
}

const AddBrokerForm: React.FC<AddBrokerFormProps> = ({ onClose, onAddBroker }) => {
  const { broker, setBroker, handleSubmit } = useAddBroker(onAddBroker, onClose);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <BrokerDetails broker={broker} setBroker={setBroker} />
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Add Broker
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrokerForm;

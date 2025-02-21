import { useEffect, useState, FC } from "react";
import ViewBrokerDetails from "./ViewBrokerDetails";
import { Broker } from "../../../types/BrokerTypes";

interface ViewBrokerFormProps {
  broker: Broker | null;
  onClose: () => void;
}

const ViewBrokerForm: FC<ViewBrokerFormProps> = ({ broker, onClose }) => {
  const [formBroker, setFormBroker] = useState<Broker>({
    id: 0,
    broker_name: "",
    broker_address: "",
    broker_city: "",
    broker_state: "",
    broker_country: "",
    broker_postal: "",
    broker_email: "",
    broker_phone: "",
    broker_ext: "",
    broker_fax: "",
  });

  useEffect(() => {
    if (broker) {
      console.log("Selected Broker:", broker); // Log selectedBroker to see the value

      setFormBroker({
        id: broker.id,
        broker_name: broker.broker_name || "",
        broker_address: broker.broker_address || "",
        broker_city: broker.broker_city || "",
        broker_state: broker.broker_state || "",
        broker_country: broker.broker_country || "",
        broker_postal: broker.broker_postal || "",
        broker_email: broker.broker_email || "",
        broker_phone: broker.broker_phone || "",
        broker_ext: broker.broker_ext || "",
        broker_fax: broker.broker_fax || "",
      });
    }
  }, [broker]);

  return (
    <div className="form-container">
      <form className="form-main">
        <ViewBrokerDetails formBroker={formBroker} />
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewBrokerForm;

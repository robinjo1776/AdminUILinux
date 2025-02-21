import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserContext } from '../../../UserProvider';
import ViewGeneral from './ViewGeneral';
import ViewCarrierDetails from './ViewCarrierDetails';
import ViewLiabilityInsurance from './ViewLiabilityInsurance';
import ViewCargoInsurance from './ViewCargoInsurance';
import ViewPrimaryAddress from './ViewPrimaryAddress';
import ViewMailingAddress from './ViewMailingAddress';
import ViewCarrierContact from './ViewCarrierContact';
import ViewCarrierEquipment from './ViewCarrierEquipment';
import ViewCarrierLane from './ViewCarrierLane';
import { Carrier } from '../../../types/CarrierTypes';

interface ViewCarrierFormProps {
  carrier: Carrier | null;
  onClose: () => void;
}

const ViewCarrierForm: React.FC<ViewCarrierFormProps> = ({ carrier, onClose }) => {
  const users = useContext(UserContext);
  const [formCarrier, setFormCarrier] = useState<Carrier>({
    id: 0,
    dba: '',
    legal_name: '',
    remit_name: '',
    acc_no: '',
    branch: '',
    website: '',
    fed_id_no: '',
    pref_curr: '',
    pay_terms: '',
    form_1099: false,
    advertise: false,
    advertise_email: '',
    carr_type: '',
    rating: '',
    brok_carr_aggmt: '',
    docket_no: '',
    dot_number: '',
    wcb_no: '',
    ca_bond_no: '',
    us_bond_no: '',
    scac: '',
    csa_approved: false,
    hazmat: false,
    smsc_code: '',
    approved: false,
    li_provider: '',
    li_policy_no: '',
    li_coverage: 0,
    li_start_date: '',
    li_end_date: '',
    ci_provider: '',
    ci_policy_no: '',
    ci_coverage: '',
    ci_start_date: '',
    ci_end_date: '',
    coi_cert: '',
    primary_address: '',
    primary_city: '',
    primary_state: '',
    primary_country: '',
    primary_postal: '',
    primary_phone: '',
    sameAsPrimary: false,
    mailing_address: '',
    mailing_city: '',
    mailing_state: '',
    mailing_country: '',
    mailing_postal: '',
    mailing_phone: '',
    int_notes: '',
    contact: [],
    equipment: [],
    lane: [],
    created_at: '',
    updated_at: '',
  });

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

  useEffect(() => {
    if (carrier) {
      setFormCarrier({
        ...carrier,
        contact: Array.isArray(carrier.contact) ? carrier.contact : JSON.parse((carrier.contact as any) || '[]'),
        equipment: Array.isArray(carrier.equipment) ? carrier.equipment : JSON.parse((carrier.equipment as any) || '[]'),
        lane: Array.isArray(carrier.lane) ? carrier.lane : JSON.parse((carrier.lane as any) || '[]'),
      });
    }
  }, [carrier]);

  return (
    <div className="form-container">
      <form className="form-main">
        <ViewGeneral formCarrier={formCarrier} />
        <ViewCarrierDetails formCarrier={formCarrier} />
        <ViewLiabilityInsurance formCarrier={formCarrier} />
        <ViewCargoInsurance formCarrier={formCarrier} />
        <ViewPrimaryAddress formCarrier={formCarrier} />
        <ViewMailingAddress formCarrier={formCarrier} />
        {formCarrier.contact.map((contact, index) => (
          <ViewCarrierContact key={index} contact={contact} index={index} />
        ))}

        {formCarrier.equipment.map((equipment, index) => (
          <ViewCarrierEquipment key={index} equipment={equipment} index={index} />
        ))}

        {formCarrier.lane.map((lane, index) => (
          <ViewCarrierLane key={index} lane={lane} index={index} />
        ))}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewCarrierForm;

import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../styles/Form.css';
import General from './General';
import CarrierDetails from './CarrierDetails';
import LiabilityInsurance from './LiabilityInsurance';
import CargoInsurance from './CargoInsurance';
import PrimaryAddress from './PrimaryAddress';
import MailingAddress from './MailingAddress';
import CarrierContact from '../CarrierContact';
import CarrierEquipment from '../CarrierEquipment';
import CarrierLane from '../CarrierLane';
import { PlusOutlined } from '@ant-design/icons';
import InternalNotes from './InternalNotes';

const AddCarrierForm = ({ onClose, onAddCarrier }) => {
  const [carrier, setCarrier] = useState({
    id: '',
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
    li_coverage: '',
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
  });
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle changes in contacts, equipment, or lanes
  const handleAddContact = () => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      contact: [...(prevCarrier.contact || []), { name: '', phone: '', email: '', fax: '', designation: '' }],
    }));
  };

  const handleRemoveContact = (index) => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      contact: (prevCarrier.contact || []).filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = (carrier.contact || []).map((contact, i) => (i === index ? updatedContact : contact));
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      contact: updatedContacts,
    }));
  };

  const handleAddEquipment = () => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      equipment: [...(prevCarrier.equipment || []), { equipment: '' }],
    }));
  };

  const handleRemoveEquipment = (index) => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      equipment: (prevCarrier.equipment || []).filter((_, i) => i !== index),
    }));
  };

  const handleEquipmentChange = (index, updatedEquipment) => {
    const updatedEquipments = (carrier.equipment || []).map((equipment, i) => (i === index ? updatedEquipment : equipment));
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      equipment: updatedEquipments,
    }));
  };

  const handleAddLane = () => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      lane: [...(prevCarrier.lane || []), { lane: '' }],
    }));
  };

  const handleRemoveLane = (index) => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      lane: (prevCarrier.lane || []).filter((_, i) => i !== index),
    }));
  };

  const handleLaneChange = (index, updatedLane) => {
    const updatedLanes = (carrier.lane || []).map((lane, i) => (i === index ? updatedLane : lane));
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      lane: updatedLanes,
    }));
  };

  const validateCarrier = () => {
    return carrier.dba;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateCarrier()) {
      try {
        let response;
        const token = localStorage.getItem('token');

        if (!token) {
          Swal.fire('Error', 'No token found', 'error');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (carrier.id) {
          response = await axios.put(`${API_URL}/carrier/${carrier.id}`, carrier, { headers });
          Swal.fire('Updated!', 'Carrier data has been updated successfully.', 'success');
        } else {
          response = await axios.post(`${API_URL}/carrier`, carrier, {
            headers,
          });
          Swal.fire('Saved!', 'Carrier data has been saved successfully.', 'success');
        }

        onAddCarrier(response.data);
        clearCarrierForm();
        onClose();
      } catch (error) {
        console.error('Error saving/updating carrier:', error.response ? error.response.data : error.message);
        Swal.fire('Error', 'An error occurred while saving/updating the carrier.', 'error');
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const clearCarrierForm = () => {
    setCarrier({
      id: '',
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
      li_coverage: '',
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
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
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
            {Array.isArray(carrier.contact) &&
              carrier.contact.map((contact, index) => (
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
            {Array.isArray(carrier.equipment) &&
              carrier.equipment.map((equipment, index) => (
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
            {Array.isArray(carrier.lane) &&
              carrier.lane.map((lane, index) => (
                <CarrierLane key={index} lane={lane} index={index} handleLaneChange={handleLaneChange} handleRemoveLane={handleRemoveLane} />
              ))}
            <button type="button" onClick={handleAddLane} className="add-button">
              <PlusOutlined />
            </button>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
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

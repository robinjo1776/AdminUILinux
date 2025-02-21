import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Carrier } from '../../types/CarrierTypes';

export const useAddCarrier = (onClose: () => void, onAddCarrier: (carrier: Carrier) => void) => {
  const initialCarrierState: Carrier = {
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
    ci_coverage: 0,
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
  };

  const [carrier, setCarrier] = useState<Carrier>(initialCarrierState);
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (carrier.dba) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire('Error', 'No token found', 'error');
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };
        let response;
        if (carrier.id) {
          response = await axios.put(`${API_URL}/carrier/${carrier.id}`, carrier, { headers });
          Swal.fire('Updated!', 'Carrier data has been updated successfully.', 'success');
        } else {
          response = await axios.post(`${API_URL}/carrier`, carrier, { headers });
          Swal.fire('Saved!', 'Carrier data has been saved successfully.', 'success');
        }
        onAddCarrier(response.data);
        onClose();
      } catch (error: any) {
        Swal.fire('Error', 'An error occurred while saving/updating the carrier.', 'error');
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const handleAddContact = () => {
    setCarrier((prev) => ({
      ...prev,
      contact: [...prev.contact, { name: '', phone: '', email: '', fax: '', designation: '' }],
    }));
  };

  const handleRemoveContact = (index: number) => {
    setCarrier((prev) => ({
      ...prev,
      contact: prev.contact.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCarrier((prev) => {
      const updatedContacts = [...prev.contact];
      updatedContacts[index] = { ...updatedContacts[index], [name]: value };
      return { ...prev, contact: updatedContacts };
    });
  };

  const handleAddEquipment = () => {
    setCarrier((prev) => ({ ...prev, equipment: [...prev.equipment, { equipment: '' }] }));
  };

  const handleRemoveEquipment = (index: number) => {
    setCarrier((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index),
    }));
  };

  const handleEquipmentChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCarrier((prev) => {
      const updatedEquipment = [...prev.equipment];
      updatedEquipment[index] = { ...updatedEquipment[index], [name]: value };
      return { ...prev, equipment: updatedEquipment };
    });
  };

  const handleAddLane = () => {
    setCarrier((prev) => ({ ...prev, lane: [...prev.lane, { from: '', to: '' }] }));
  };

  const handleRemoveLane = (index: number) => {
    setCarrier((prev) => ({
      ...prev,
      lane: prev.lane.filter((_, i) => i !== index),
    }));
  };

  const handleLaneChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCarrier((prev) => {
      const updatedLanes = [...prev.lane];
      updatedLanes[index] = { ...updatedLanes[index], [name]: value };
      return { ...prev, lane: updatedLanes };
    });
  };

  const clearCarrierForm = () => {
    setCarrier(initialCarrierState);
  };

  return {
    carrier,
    setCarrier,
    handleSubmit,
    handleAddContact,
    handleRemoveContact,
    handleContactChange,
    handleAddEquipment,
    handleRemoveEquipment,
    handleEquipmentChange,
    handleAddLane,
    handleRemoveLane,
    handleLaneChange,
    clearCarrierForm,
  };
};

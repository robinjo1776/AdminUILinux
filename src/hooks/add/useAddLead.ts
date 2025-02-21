import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Lead, Contact } from '../../types/LeadTypes';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const useAddLead = (onClose: () => void, onAddLead: (vendor: Lead) => void) => {
  const [lead, setLead] = useState<Lead>({
    id: 0,
    lead_no: '',
    lead_date: '',
    customer_name: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    unit_no: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    lead_type: '',
    contact_person: '',
    notes: '',
    lead_status: '',
    follow_up_date: '',
    equipment_type: '',
    assigned_to: '',
    contacts: [],
    created_at: '',
    updated_at: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire('Error', 'No token found', 'error');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = lead.id
        ? await axios.put(`${API_URL}/lead/${lead.id}`, lead, { headers })
        : await axios.post(`${API_URL}/lead`, lead, { headers });

      Swal.fire('Success', 'Lead data has been saved successfully.', 'success');
      onAddLead(response.data);
      onClose();
    } catch (error) {
      console.error('Error saving/updating lead:', error);
      Swal.fire('Error', 'An error occurred while saving/updating the lead.', 'error');
    }
  };

  const clearLeadForm = () => {
    setLead({ ...lead, id: 0, contacts: [] });
  };

  const handleAddContact = () => {
    setLead((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', phone: '', email: '', fax: '', designation: '' }],
    }));
  };

  const handleRemoveContact = (index: number) => {
    setLead((prevVendor) => ({
      ...prevVendor,
      contacts: prevVendor.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index: number, updatedContact: Contact) => {
    const updatedContacts = lead.contacts.map((contact, i) => (i === index ? updatedContact : contact));
    setLead((prevVendor) => ({
      ...prevVendor,
      contacts: updatedContacts,
    }));
  };

  return {
    lead,
    setLead,
    handleAddContact,
    handleRemoveContact,
    handleContactChange,
    handleSubmit,
    clearLeadForm,
  };
};

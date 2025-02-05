import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const addOrderHandler = ({ onClose, onAddOrder }) => {
  const [order, setOrder] = useState({
    id: '',
    customer: '',
    customer_ref_no: '',
    branch: '',
    booked_by: '',
    account_rep: '',
    sales_rep: '',
    customer_po_no: '',
    commodity: '',
    equipment: '',
    load_type: '',
    temperature: '',
    origin_location: [],
    destination_location: [],
    hot: false,
    team: false,
    air_ride: false,
    tarp: false,
    hazmat: false,
    currency: '',
    base_price: '',
    charges: [],
    discounts: [],
    gst: '',
    pst: '',
    hst: '',
    qst: '',
    final_price: '',
    notes: '',
  });
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  
  // Validation functions
  const sanitizeInput = (input) => input.replace(/[^\w\s]/g, '');
  const isValidPhone = (phone) => /^\+?\(?\d{1,3}\)?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/.test(phone);
  const isValidPostalCode = (postalCode) => /^[a-zA-Z0-9\s]{3,10}$/.test(postalCode);

  const validateOrigins = () => {
    for (let origin of order.origin_location) {
      if (origin.phone && !isValidPhone(origin.phone)) {
        Swal.fire('Validation Error', `Please enter a valid phone number for ${origin.address}.`, 'error');
        return false;
      }
      if (origin.postal && !isValidPostalCode(origin.postal)) {
        Swal.fire('Validation Error', `Please enter a valid postal code for ${origin.address}.`, 'error');
        return false;
      }
    }
    return true;
  };

  const validateDestinations = () => {
    for (let destination of order.destination_location) {
      if (destination.phone && !isValidPhone(destination.phone)) {
        Swal.fire('Validation Error', `Please enter a valid phone number for ${destination.address}.`, 'error');
        return false;
      }
      if (destination.postal && !isValidPostalCode(destination.postal)) {
        Swal.fire('Validation Error', `Please enter a valid postal code for ${destination.address}.`, 'error');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (order.phone && !isValidPhone(order.phone)) {
      Swal.fire('Validation Error', 'Please enter a valid phone number.', 'error');
      return;
    }

    if (order.postal && !isValidPostalCode(order.postal)) {
      Swal.fire('Validation Error', 'Please enter a valid postal code.', 'error');
      return;
    }

    if (!validateOrigins()) return;
    if (!validateDestinations()) return;

    if (validateOrder()) {
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

        const sanitizedOrder = sanitizeOrder(order);

        if (order.id) {
          response = await axios.put(`${API_URL}/order/${order.id}`, sanitizedOrder, { headers });
          Swal.fire('Updated!', 'Order data has been updated successfully.', 'success');
        } else {
          response = await axios.post(`${API_URL}/order`, sanitizedOrder, {
            headers,
          });
          Swal.fire('Saved!', 'Order data has been saved successfully.', 'success');
        }

        onAddOrder(response.data);
        clearOrderForm();
        onClose();
      } catch (error) {
        console.error('Error saving/updating order:', error.response ? error.response.data : error.message);
        Swal.fire('Error', 'An error occurred while saving/updating the order.', 'error');
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const validateOrder = () => {
    return order.customer;
  };

  const sanitizeOrder = (order) => {
    return {
      ...order,
      customer: sanitizeInput(order.customer),
      customer_ref_no: sanitizeInput(order.customer_ref_no),
      branch: order.branch,
      booked_by: sanitizeInput(order.booked_by),
      account_rep: sanitizeInput(order.account_rep),
      sales_rep: sanitizeInput(order.sales_rep),
      customer_po_no: order.customer_po_no,
      commodity: sanitizeInput(order.commodity),
      equipment: sanitizeInput(order.equipment),
      load_type: sanitizeInput(order.load_type),
      temperature: sanitizeInput(order.temperature),
      origin_location: order.origin_location.map((origin) => ({
        ...origin,
        address: sanitizeInput(origin.address),
        city: sanitizeInput(origin.city),
        state: sanitizeInput(origin.state),
        postal: sanitizeInput(origin.postal),
        country: sanitizeInput(origin.country),
        date: origin.date,
        time: origin.time,
        currency: sanitizeInput(origin.currency),
        equipment: sanitizeInput(origin.equipment),
        pickup_po: sanitizeInput(origin.pickup_po),
        phone: origin.phone,
        packages: sanitizeInput(origin.packages),
        weight: sanitizeInput(origin.weight),
        dimensions: origin.dimensions,
        notes: sanitizeInput(origin.notes),
      })),
      destination_location: order.destination_location.map((destination) => ({
        ...destination,
        address: sanitizeInput(destination.address),
        city: sanitizeInput(destination.city),
        state: sanitizeInput(destination.state),
        postal: sanitizeInput(destination.postal),
        country: sanitizeInput(destination.country),
        date: destination.date,
        time: destination.time,
        currency: sanitizeInput(destination.currency),
        equipment: sanitizeInput(destination.equipment),
        pickup_po: sanitizeInput(destination.pickup_po),
        phone: destination.phone,
        packages: sanitizeInput(destination.packages),
        weight: sanitizeInput(destination.weight),
        dimensions: destination.dimensions,
        notes: sanitizeInput(destination.notes),
      })),
      hot: order.hot,
      team: order.team,
      air_ride: order.air_ride,
      hazmat: order.hazmat,
      currency: sanitizeInput(order.currency),
      base_price: order.base_price,
      charges: order.charges.map((charge) => ({
        ...charge,
        type: sanitizeInput(charge.type),
        charge: charge.charge,
        percent: charge.percent,
      })),
      discounts: order.discounts.map((discount) => ({
        ...discount,
        type: sanitizeInput(discount.type),
        charge: discount.charge,
        percent: discount.percent,
      })),
      gst: order.gst,
      pst: order.pst,
      hst: order.hst,
      qst: order.qst,
      final_price: order.final_price,
      notes: order.notes,
    };
  };

  const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessage = error.response.data.errors.website
        ? error.response.data.errors.website[0]
        : 'An error occurred while saving/updating the order.';
      Swal.fire('Error', errorMessage, 'error');
    } else {
      console.error('Error saving/updating order:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'An error occurred while saving/updating the order.', 'error');
    }
  };

  const clearOrderForm = () => {
    setOrder({
      id: '',
      customer: '',
      customer_ref_no: '',
      branch: '',
      booked_by: '',
      account_rep: '',
      sales_rep: '',
      customer_po_no: '',
      commodity: '',
      equipment: '',
      load_type: '',
      temperature: '',
      origin_location: [],
      destination_location: [],
      hot: false,
      team: false,
      air_ride: false,
      tarp: false,
      hazmat: false,
      currency: '',
      base_price: '',
      charges: [],
      discounts: [],
      gst: '',
      pst: '',
      hst: '',
      qst: '',
      final_price: '',
      notes: '',
    });
  };
  return {
    order,
    setOrder,
    handleSubmit,
  };
};

export default addOrderHandler;

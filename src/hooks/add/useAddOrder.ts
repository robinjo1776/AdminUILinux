import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Order, Charge, Location } from '../../types/OrderTypes';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const useAddOrder = (onClose: () => void, onAddOrder: (order: Order) => void) => {
  const [order, setOrder] = useState<Order>({
    id: 0,
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
    temperature: 0,
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
    gst: 0,
    pst: 0,
    hst: 0,
    qst: 0,
    final_price: 0,
    notes: '',
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

      const response = order.id
        ? await axios.put(`${API_URL}/order/${order.id}`, order, { headers })
        : await axios.post(`${API_URL}/order`, order, { headers });

      Swal.fire('Success', 'Order data has been saved successfully.', 'success');
      onAddOrder(response.data);
      onClose();
    } catch (error) {
      console.error('Error saving/updating order:', error);
      Swal.fire('Error', 'An error occurred while saving/updating the order.', 'error');
    }
  };

  const clearOrderForm = () => {
    setOrder({
      id: 0,
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
      temperature: 0,
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
      gst: 0,
      pst: 0,
      hst: 0,
      qst: 0,
      final_price: 0,
      notes: '',
      created_at: '',
      updated_at: '',
    });
  };

  const handleOriginChange = (index: number, updatedOrigin: Location) => {
    const updatedOrigins = order.origin_location.map((origin, i) => (i === index ? updatedOrigin : origin));
    setOrder((prevOrder) => ({
      ...prevOrder,
      origin_location: updatedOrigins,
    }));
  };
  const handleDestinationChange = (index: number, updatedDestination: Location) => {
    const updatedDestinations = order.destination_location.map((destination, i) => (i === index ? updatedDestination : destination));
    setOrder((prevOrder) => ({
      ...prevOrder,
      destination_location: updatedDestinations,
    }));
  };
  const handleChargeChange = (index: number, updatedCharge: Charge) => {
    const updatedCharges = order.charges.map((charge, i) => (i === index ? updatedCharge : charge));
    setOrder((prevOrder) => ({
      ...prevOrder,
      charges: updatedCharges,
    }));
  };
  const handleDiscountChange = (index: number, updatedDiscount: Charge) => {
    const updatedDiscounts = order.discounts.map((discount, i) => (i === index ? updatedDiscount : discount));
    setOrder((prevOrder) => ({
      ...prevOrder,
      discounts: updatedDiscounts,
    }));
  };
  const handleRemoveOrigin = (index: number) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      origin_location: prevOrder.origin_location.filter((_, i) => i !== index),
    }));
  };
  const handleRemoveDestination = (index: number) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      destination_location: prevOrder.destination_location.filter((_, i) => i !== index),
    }));
  };
  const handleRemoveCharge = (index: number) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      charges: prevOrder.charges.filter((_, i) => i !== index),
    }));
  };
  const handleRemoveDiscount = (index: number) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      discounts: prevOrder.discounts.filter((_, i) => i !== index),
    }));
  };

  return {
    order,
    setOrder,
    handleSubmit,
    clearOrderForm,
    handleOriginChange,
    handleDestinationChange,
    handleChargeChange,
    handleDiscountChange,
    handleRemoveOrigin,
    handleRemoveDestination,
    handleRemoveCharge,
    handleRemoveDiscount,
  };
};

export default useAddOrder;

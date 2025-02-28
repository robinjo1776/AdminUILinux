import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Order } from '../../types/OrderTypes';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const useEditOrder = (order: Order | null, onClose: () => void, onUpdate: (order: Order) => void) => {
  const [formOrder, setFormOrder] = useState<Order>({
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

  useEffect(() => {
    if (order) {
      setFormOrder({
        ...order,
        origin_location: Array.isArray(order.origin_location) ? order.origin_location : [],
        destination_location: Array.isArray(order.destination_location) ? order.destination_location : [],
        charges: Array.isArray(order.charges) ? order.charges : [],
        discounts: Array.isArray(order.discounts) ? order.discounts : [],
      });
    }
  }, [order]);

  const updateOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'Please log in again.' });
        return;
      }

      const response = await axios.put(`${API_URL}/order/${formOrder.id}`, formOrder, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({ icon: 'success', title: 'Updated!', text: 'Order updated successfully.' });
      onUpdate(response.data);
      onClose();
    } catch (error: any) {
      console.error('Error updating order:', error.response?.data || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update order.',
      });
    }
  };

  const handleAddOrigin = () => {
    setFormOrder((prev) => ({
      ...prev,
      origin_location: [
        ...prev.origin_location,
        {
          address: '',
          city: '',
          state: '',
          postal: '',
          country: '',
          date: '',
          time: '',
          currency: '',
          equipment: '',
          pickup_po: '',
          phone: '',
          packages: '',
          weight: '',
          dimensions: '',
          notes: '',
        },
      ],
    }));
  };
  const handleOriginChange = (index: number, updatedOrigin: any) => {
    const updatedOrigins = [...formOrder.origin_location];
    updatedOrigins[index] = updatedOrigin;
    setFormOrder({ ...formOrder, origin_location: updatedOrigins });
  };

  const handleRemoveOrigin = (index: number) => {
    const updatedOrigins = formOrder.origin_location.filter((_, i) => i !== index);
    setFormOrder({ ...formOrder, origin_location: updatedOrigins });
  };

  const handleAddDestination = () => {
    setFormOrder((prev) => ({
      ...prev,
      destination_location: [
        ...prev.destination_location,
        {
          address: '',
          city: '',
          state: '',
          postal: '',
          country: '',
          date: '',
          time: '',
          currency: '',
          equipment: '',
          pickup_po: '',
          phone: '',
          packages: '',
          weight: '',
          dimensions: '',
          notes: '',
        },
      ],
    }));
  };
  const handleDestinationChange = (index: number, updatedDestination: any) => {
    const updatedDestinations = [...formOrder.destination_location];
    updatedDestinations[index] = updatedDestination;
    setFormOrder({ ...formOrder, destination_location: updatedDestinations });
  };

  const handleRemoveDestination = (index: number) => {
    const updatedDestinations = formOrder.destination_location.filter((_, i) => i !== index);
    setFormOrder({ ...formOrder, destination_location: updatedDestinations });
  };

  const handleAddCharge = () => {
    setFormOrder((prev) => ({
      ...prev,
      charges: [
        ...prev.charges,
        {
          type: '',
          charge: 0,
          percent: 0,
        },
      ],
    }));
  };

  const handleChargeChange = (index: number, updatedCharge: any) => {
    const updatedCharges = [...formOrder.charges];
    updatedCharges[index] = updatedCharge;
    setFormOrder({ ...formOrder, charges: updatedCharges });
  };

  const handleRemoveCharge = (index: number) => {
    const updatedCharges = formOrder.charges.filter((_, i) => i !== index);
    setFormOrder({ ...formOrder, charges: updatedCharges });
  };

  const handleAddDiscount = () => {
    setFormOrder((prev) => ({
      ...prev,
      discounts: [
        ...prev.discounts,
        {
          type: '',
          charge: 0,
          percent: 0,
        },
      ],
    }));
  };

  const handleDiscountChange = (index: number, updatedDiscount: any) => {
    const updatedDiscounts = [...formOrder.discounts];
    updatedDiscounts[index] = updatedDiscount;
    setFormOrder({ ...formOrder, discounts: updatedDiscounts });
  };

  const handleRemoveDiscount = (index: number) => {
    const updatedDiscounts = formOrder.discounts.filter((_, i) => i !== index);
    setFormOrder({ ...formOrder, discounts: updatedDiscounts });
  };

  return {
    formOrder,
    setFormOrder,
    updateOrder,
    handleAddOrigin,
    handleOriginChange,
    handleRemoveOrigin,
    handleAddDestination,
    handleDestinationChange,
    handleRemoveDestination,
    handleAddCharge,
    handleChargeChange,
    handleRemoveCharge,
    handleAddDiscount,
    handleDiscountChange,
    handleRemoveDiscount,
  };
};

export default useEditOrder;

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Order } from '../../types/OrderTypes';

interface UseEditOrderProps {
  order: Order | null;
  onUpdate: (updatedOrder: Order) => void;
  onClose: () => void;
}

const defaultOrder: Order = {
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
};

export function useEditOrder({ order, onUpdate, onClose }: UseEditOrderProps) {
  const [formOrder, _setFormOrder] = useState<Order>(order ?? defaultOrder);

  const setFormOrder = (order: Order | ((prevOrder: Order) => Order)) => {
    _setFormOrder(order);
  };
  
  const API_URL = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:3000/api';

  useEffect(() => {
    if (order) {
      _setFormOrder(order);
    }
  }, [order]);

  const updateOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || typeof token !== 'string') {
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
        text: error.response?.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update order.',
      });
    }
  };

  const handleAddItem = (key: 'origin_location' | 'destination_location', item: any) => {
    setFormOrder((prev) => ({
      ...prev,
      [key]: [...prev[key], item],
    }));
  };

  const handleItemChange = (key: 'origin_location' | 'destination_location', index: number, updatedItem: any) => {
    setFormOrder((prev) => {
      const updatedArray = [...prev[key]];
      updatedArray[index] = updatedItem;
      return { ...prev, [key]: updatedArray };
    });
  };

  const handleRemoveItem = (key: 'origin_location' | 'destination_location', index: number) => {
    setFormOrder((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const handleAddChargeOrDiscount = (key: 'charges' | 'discounts') => {
    setFormOrder((prev) => ({
      ...prev,
      [key]: [...prev[key], { type: '', charge: 0, percent: 0 }],
    }));
  };

  const handleChangeChargeOrDiscount = (key: 'charges' | 'discounts', index: number, updatedItem: any) => {
    setFormOrder((prev) => {
      const updatedArray = [...prev[key]];
      updatedArray[index] = updatedItem;
      return { ...prev, [key]: updatedArray };
    });
  };

  const handleRemoveChargeOrDiscount = (key: 'charges' | 'discounts', index: number) => {
    setFormOrder((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  return {
    formOrder,
    setFormOrder,
    updateOrder,
    handleAddItem,
    handleItemChange,
    handleRemoveItem,
    handleAddChargeOrDiscount,
    handleChangeChargeOrDiscount,
    handleRemoveChargeOrDiscount,
  };
}

export default useEditOrder;

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Carrier } from '../../types/CarrierTypes';

interface UseEditCarrierProps {
  carrier: Carrier | null;
  onUpdate: (updatedCarrier: Carrier) => void;
  onClose: () => void;
}

export function useEditCarrier({ carrier, onUpdate, onClose }: UseEditCarrierProps) {
  const [formCarrier, setFormCarrier] = useState<Carrier>(carrier || {} as Carrier);
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  useEffect(() => {
    if (carrier) {
      setFormCarrier(carrier);
    }
  }, [carrier]);

  const updateCarrier = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You are not logged in. Please log in again.',
        });
        return;
      }

      const response = await axios.put(`${API_URL}/carrier/${formCarrier.id}`, formCarrier, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Carrier data has been updated successfully.',
      });

      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating carrier:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update carrier.',
      });
    }
  };

  return { formCarrier, setFormCarrier, updateCarrier };
}

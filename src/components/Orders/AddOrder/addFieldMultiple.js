import { useState } from 'react';

const addFieldMultiple = () => {
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


  const sanitizeInput = (input) => input.replace(/[^\w\s]/g, '');


  const handleOriginChange = (index, updatedOrigin) => {
    const sanitizedOrigin = {
      ...updatedOrigin,
      address: sanitizeInput(updatedOrigin.address),
      city: sanitizeInput(updatedOrigin.city),
      state: sanitizeInput(updatedOrigin.state),
      postal: sanitizeInput(updatedOrigin.postal),
      country: sanitizeInput(updatedOrigin.country),
      date: updatedOrigin.date,
      time: updatedOrigin.time,
      currency: sanitizeInput(updatedOrigin.currency),
      equipment: sanitizeInput(updatedOrigin.equipment),
      pickup_po: sanitizeInput(updatedOrigin.pickup_po),
      phone: updatedOrigin.phone,
      packages: sanitizeInput(updatedOrigin.packages),
      weight: sanitizeInput(updatedOrigin.weight),
      dimensions: updatedOrigin.dimensions,
      notes: sanitizeInput(updatedOrigin.notes),
    };
    const updatedOrigins = [...order.origin_location];
    updatedOrigins[index] = sanitizedOrigin;
    setOrder({ ...order, origin_location: updatedOrigins });
  };

  const handleDestinationChange = (index, updatedDestination) => {
    const sanitizedDestination = {
      ...updatedDestination,
      address: sanitizeInput(updatedDestination.address),
      city: sanitizeInput(updatedDestination.city),
      state: sanitizeInput(updatedDestination.state),
      postal: sanitizeInput(updatedDestination.postal),
      country: sanitizeInput(updatedDestination.country),
      date: updatedDestination.date,
      time: updatedDestination.time,
      currency: sanitizeInput(updatedDestination.currency),
      equipment: sanitizeInput(updatedDestination.equipment),
      pickup_po: sanitizeInput(updatedDestination.pickup_po),
      phone: updatedDestination.phone,
      packages: sanitizeInput(updatedDestination.packages),
      weight: sanitizeInput(updatedDestination.weight),
      dimensions: updatedDestination.dimensions,
      notes: sanitizeInput(updatedDestination.notes),
    };
    const updatedDestinations = [...order.destination_location];
    updatedDestinations[index] = sanitizedDestination;
    setOrder({ ...order, destination_location: updatedDestinations });
  };

  const handleChargeChange = (index, updatedCharge) => {
    const sanitizedCharge = {
      ...updatedCharge,
      type: sanitizeInput(updatedCharge.type),
      charge: sanitizeInput(updatedCharge.charge),
      percent: sanitizeInput(updatedCharge.percent),
    };
    const updatedCharges = [...order.charges];
    updatedCharges[index] = sanitizedCharge;
    setOrder({ ...order, charges: updatedCharges });
  };

  const handleDiscountChange = (index, updatedDiscount) => {
    const sanitizedDiscount = {
      ...updatedDiscount,
      type: sanitizeInput(updatedDiscount.type),
      charge: sanitizeInput(updatedDiscount.charge),
      percent: sanitizeInput(updatedDiscount.percent),
    };
    const updatedDiscounts = [...order.discounts];
    updatedDiscounts[index] = sanitizedDiscount;
    setOrder({ ...order, discounts: updatedDiscounts });
  };

  const handleRemoveOrigin = (index) => {
    const updatedOrigins = order.origin_location.filter((_, i) => i !== index);
    setOrder({ ...order, origin_location: updatedOrigins });
  };

  const handleRemoveDestination = (index) => {
    const updatedDestinations = order.destination_location.filter((_, i) => i !== index);
    setOrder({ ...order, destination_location: updatedDestinations });
  };

  const handleRemoveCharge = (index) => {
    const updatedCharges = order.charges.filter((_, i) => i !== index);
    setOrder({ ...order, charges: updatedCharges });
  };

  const handleRemoveDiscount = (index) => {
    const updatedDiscounts = order.discounts.filter((_, i) => i !== index);
    setOrder({ ...order, discounts: updatedDiscounts });
  };

  return {
    order,
    setOrder,
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

export default addFieldMultiple;

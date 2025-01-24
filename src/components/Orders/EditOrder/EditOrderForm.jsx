import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditOrderGeneral from './EditOrderGeneral';
import EditOrderShipment from './EditOrderShipment';
import EditOrderOrigin from './EditOrderOrigin';
import EditOrderDestination from './EditOrderDestination';
import EditOrderSpecs from './EditOrderSpecs';
import EditOrderRevenue from './EditOrderRevenue';
import EditOrderCharges from './EditOrderCharges';
import EditOrderDiscounts from './EditOrderDiscounts';
import EditOrderTax from './EditOrderTax';
import { PlusOutlined } from '@ant-design/icons';

const EditOrderForm = ({ order, onClose, onUpdate }) => {
  const [formOrder, setFormOrder] = useState({
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
    origin_location: [
      {
        address: '',
        city: '',
        state: '',
        country: '',
        postal: '',
        date: '',
        time: '',
        po: '',
        phone: '',
        notes: '',
        packages: '',
        weight: '',
        dimensions: '',
      },
    ],
    destination_location: [
      {
        address: '',
        city: '',
        state: '',
        country: '',
        postal: '',
        date: '',
        time: '',
        po: '',
        phone: '',
        notes: '',
        packages: '',
        weight: '',
        dimensions: '',
      },
    ],
    hot: false,
    team: false,
    air_ride: false,
    tarp: false,
    hazmat: false,
    currency: '',
    base_price: '',
    charges: [{ type: '', charge: '', percent: '' }],
    discounts: [{ type: '', charge: '', percent: '' }],
    gst: '',
    pst: '',
    hst: '',
    qst: '',
    final_price: '',
    notes: '',
  });
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (order) {
      const parsedOrigins = Array.isArray(order.origin_location) ? order.origin_location : JSON.parse(order.origin_location || '[]');
      const parsedDestinations = Array.isArray(order.destination_location)
        ? order.destination_location
        : JSON.parse(order.destination_location || '[]');
      const parsedCharges = Array.isArray(order.charges) ? order.charges : JSON.parse(order.charges || '[]');
      const parsedDiscounts = Array.isArray(order.discounts) ? order.discounts : JSON.parse(order.discounts || '[]');
      setFormOrder({
        ...order,
        origin_location: parsedOrigins.length > 0 ? parsedOrigins : [],
        destination_location: parsedDestinations.length > 0 ? parsedDestinations : [],
        charges: parsedCharges.length > 0 ? parsedCharges : [],
        discounts: parsedDiscounts.length > 0 ? parsedDiscounts : [],
      });
    }
  }, [order]);

  const updateOrder = async () => {
    try {
      // Get the token from localStorage or from the UserContext
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

      if (!token) {
        // If no token is found, show an alert and exit the function
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You are not logged in. Please log in again.',
        });
        return;
      }

      // Make the PUT request with the Authorization header
      const response = await axios.put(`${API_URL}/order/${formOrder.id}`, formOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Order data has been updated successfully.',
      });

      // Call onUpdate to update the lead data in the parent component
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating order:', error);

      // Handle different errors, including the 401 Unauthorized
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update order.',
      });
    }
  };

  const handleAddOrigin = () => {
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      origin_location: [
        ...prevOrder.origin_location,
        {
          address: '',
          city: '',
          state: '',
          country: '',
          postal: '',
          date: '',
          time: '',
          po: '',
          phone: '',
          notes: '',
          packages: '',
          weight: '',
          dimensions: '',
        },
      ],
    }));
  };

  const handleRemoveOrigin = (index) => {
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      origin_location: prevOrder.origin_location.filter((_, i) => i !== index),
    }));
  };

  const handleOriginChange = (index, updatedOrigin) => {
    const updatedOrigins = formOrder.origin_location.map((origin, i) => (i === index ? updatedOrigin : origin));
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      origin_location: updatedOrigins,
    }));
  };

  const handleAddDestination = () => {
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      destination_location: [
        ...prevOrder.destination_location,
        {
          address: '',
          city: '',
          state: '',
          country: '',
          postal: '',
          date: '',
          time: '',
          po: '',
          phone: '',
          notes: '',
          packages: '',
          weight: '',
          dimensions: '',
        },
      ],
    }));
  };

  const handleRemoveDestination = (index) => {
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      destination_location: prevOrder.destination_location.filter((_, i) => i !== index),
    }));
  };

  const handleDestinationChange = (index, updatedDestination) => {
    const updatedDestinations = formOrder.destination_location.map((destination, i) => (i === index ? updatedDestination : destination));
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      destination_location: updatedDestinations,
    }));
  };

  const handleRemoveCharge = (index) => {
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      charges: prevOrder.charges.filter((_, i) => i !== index),
    }));
  };

  const handleChargeChange = (index, updatedCharge) => {
    const updatedCharges = formOrder.charges.map((charge, i) => (i === index ? updatedCharge : charge));
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      charges: updatedCharges,
    }));
  };

  const handleRemoveDiscount = (index) => {
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      discounts: prevOrder.discounts.filter((_, i) => i !== index),
    }));
  };

  const handleDiscountChange = (index, updatedDiscount) => {
    const updatedDiscounts = formOrder.discounts.map((discount, i) => (i === index ? updatedDiscount : discount));
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      discounts: updatedDiscounts,
    }));
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateOrder();
        }}
        className="form-main"
      >
        <EditOrderGeneral formOrder={formOrder} setFormOrder={setFormOrder} />
        <EditOrderShipment formOrder={formOrder} setFormOrder={setFormOrder} />
        <fieldset className="form-section">
          <legend>Origin</legend>
          <div className="form-row">
            {formOrder.origin_location.map((origin, index) => (
              <EditOrderOrigin
                key={index}
                formOrder={formOrder}
                setFormOrder={setFormOrder}
                origin={origin}
                index={index}
                onChange={handleOriginChange}
                onRemove={handleRemoveOrigin}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormOrder((prevOrder) => ({
                  ...prevOrder,
                  origin_location: [
                    ...prevOrder.origin_location,
                    {
                      address: '',
                      city: '',
                      state: '',
                      country: '',
                      postal: '',
                      date: '',
                      time: '',
                      po: '',
                      phone: '',
                      notes: '',
                      packages: '',
                      weight: '',
                      dimensions: '',
                    },
                  ],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Destination</legend>
          <div className="form-row">
            {formOrder.destination_location.map((destination, index) => (
              <EditOrderDestination
                key={index}
                formOrder={formOrder}
                setFormOrder={setFormOrder}
                destination={destination}
                index={index}
                onChange={handleDestinationChange}
                onRemove={handleRemoveDestination}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormOrder((prevOrder) => ({
                  ...prevOrder,
                  destination_location: [
                    ...prevOrder.destination_location,
                    {
                      address: '',
                      city: '',
                      state: '',
                      country: '',
                      postal: '',
                      date: '',
                      time: '',
                      po: '',
                      phone: '',
                      notes: '',
                      packages: '',
                      weight: '',
                      dimensions: '',
                    },
                  ],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <EditOrderSpecs formOrder={formOrder} setFormOrder={setFormOrder} />
        <EditOrderRevenue formOrder={formOrder} setFormOrder={setFormOrder} />

        <fieldset className="form-section">
          <legend>Charges</legend>
          <div className="form-row">
            {formOrder.charges.map((charge, index) => (
              <EditOrderCharges
                key={index}
                formOrder={formOrder}
                setFormOrder={setFormOrder}
                charge={charge}
                index={index}
                onChange={handleChargeChange}
                onRemove={handleRemoveCharge}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormOrder((prevOrder) => ({
                  ...prevOrder,
                  charges: [...prevOrder.charges, { type: '', charge: '', percent: '' }],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Discounts</legend>
          <div className="form-row">
            {formOrder.discounts.map((discount, index) => (
              <EditOrderDiscounts
                key={index}
                formOrder={formOrder}
                setFormOrder={setFormOrder}
                discount={discount}
                index={index}
                onChange={handleDiscountChange}
                onRemove={handleRemoveDiscount}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormOrder((prevOrder) => ({
                  ...prevOrder,
                  discounts: [...prevOrder.discounts, { type: '', charge: '', percent: '' }],
                }))
              }
              className="add-button"
            >
              <PlusOutlined />
            </button>
          </div>
        </fieldset>
        <EditOrderTax formOrder={formOrder} setFormOrder={setFormOrder} />
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrderForm;

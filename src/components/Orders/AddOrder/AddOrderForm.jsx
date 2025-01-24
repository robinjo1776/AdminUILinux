import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../styles/Form.css';
import OrderGeneral from './OrderGeneral';
import OrderShipment from './OrderShipment';
import OrderOrigin from './OrderOrigin';
import OrderDestination from './OrderDestination';
import OrderSpecs from './OrderSpecs';
import OrderRevenue from './OrderRevenue';
import OrderCharges from './OrderCharges';
import OrderDiscounts from './OrderDiscounts';
import OrderTax from './OrderTax';
import { PlusOutlined } from '@ant-design/icons';

const AddOrderForm = ({ onClose, onAddOrder }) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

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

        if (order.id) {
          response = await axios.put(`${API_URL}/order/${order.id}`, order, { headers });
          Swal.fire('Updated!', 'Order data has been updated successfully.', 'success');
        } else {
          response = await axios.post(`${API_URL}/order`, order, {
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

  const handleOriginChange = (index, updatedOrigin) => {
    // When a contact changes, update the specific contact in the contacts array
    const updatedOrigins = [...order.origin_location];
    updatedOrigin[index] = updatedOrigin;
    setOrder({ ...order, origin_location: updatedOrigins }); // Set the updated contacts back into the state
  };

  const handleRemoveOrigin = (index) => {
    const updatedOrigins = order.origin_location.filter((_, i) => i !== index);
    setOrder({ ...order, origin_location: updatedOrigins });
  };

  const handleDestinationChange = (index, updatedDestination) => {
    // When a contact changes, update the specific contact in the contacts array
    const updatedDestinations = [...order.destination_location];
    updatedDestination[index] = updatedDestination;
    setOrder({ ...order, destination_location: updatedDestinations }); // Set the updated contacts back into the state
  };

  const handleRemoveDestination = (index) => {
    const updatedDestinations = order.destination_location.filter((_, i) => i !== index);
    setOrder({ ...order, destination_location: updatedDestinations });
  };

  const handleChargeChange = (index, updatedCharge) => {
    // When a contact changes, update the specific contact in the contacts array
    const updatedCharges = [...order.charges];
    updatedCharge[index] = updatedCharge;
    setOrder({ ...order, charges: updatedCharges }); // Set the updated contacts back into the state
  };

  const handleRemoveCharge = (index) => {
    const updatedCharges = order.charges.filter((_, i) => i !== index);
    setOrder({ ...order, charges: updatedCharges });
  };

  const handleDiscountChange = (index, updatedDiscount) => {
    // When a contact changes, update the specific contact in the contacts array
    const updatedDiscounts = [...order.discounts];
    updatedDiscounts[index] = updatedDiscount;
    setOrder({ ...order, discounts: updatedDiscounts }); // Set the updated contacts back into the state
  };

  const handleRemoveDiscount = (index) => {
    const updatedDiscounts = order.discounts.filter((_, i) => i !== index);
    setOrder({ ...order, discounts: updatedDiscounts });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <OrderGeneral order={order} setOrder={setOrder} />
        <OrderShipment order={order} setOrder={setOrder} />
        <fieldset className="form-section">
          <legend>Origin</legend>
          <div className="form-row">
            {order.origin_location.map((origin, index) => (
              <OrderOrigin
                key={index}
                order={order}
                setOrder={setOrder}
                origin={origin}
                index={index}
                onChange={handleOriginChange}
                onRemove={handleRemoveOrigin}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setOrder((prevOrder) => ({
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
            {order.destination_location.map((destination, index) => (
              <OrderDestination
                key={index}
                order={order}
                setOrder={setOrder}
                destination={destination}
                index={index}
                onChange={handleDestinationChange}
                onRemove={handleRemoveDestination}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setOrder((prevOrder) => ({
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
        <OrderSpecs order={order} setOrder={setOrder} />
        <OrderRevenue order={order} setOrder={setOrder} />

        <fieldset className="form-section">
          <legend>Charges</legend>
          <div className="form-row">
            {order.charges.map((charge, index) => (
              <OrderCharges
                key={index}
                order={order}
                setOrder={setOrder}
                charge={charge}
                index={index}
                onChange={handleChargeChange}
                onRemove={handleRemoveCharge}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setOrder((prevOrder) => ({
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
            {order.discounts.map((discount, index) => (
              <OrderDiscounts
                key={index}
                order={order}
                setOrder={setOrder}
                discount={discount}
                index={index}
                onChange={handleDiscountChange}
                onRemove={handleRemoveDiscount}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setOrder((prevOrder) => ({
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
        <OrderTax order={order} setOrder={setOrder} />

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Generate Order
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrderForm;

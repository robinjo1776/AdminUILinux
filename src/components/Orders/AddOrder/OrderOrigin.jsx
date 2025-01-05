import { useEffect, useRef } from 'react';

function OrderOrigin({ setOrder, order, origin = {}, index, onRemove }) {
  const addressRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.maps) {
          initializeAutocomplete();
        }
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place || !place.address_components) {
        console.error('No valid address selected');
        return;
      }
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;

    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim();

    setOrder((prevOrder) => ({
      ...prevOrder,
      origin_location: prevOrder.origin_location.map((p, idx) =>
        idx === index
          ? {
              ...p,
              address: mainAddress,
              city: getComponent('locality', '', addressComponents),
              state: getComponent('administrative_area_level_1', '', addressComponents),
              country: getComponent('country', '', addressComponents),
              postal: getComponent('postal_code', '', addressComponents),
            }
          : p
      ),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;

    setOrder((prevOrder) => ({
      ...prevOrder,
      origin_location: prevOrder.origin_location.map((loc, idx) => (idx === index ? { ...loc, [name]: value } : loc)),
    }));
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Address</label>
        <input type="text" name="address" value={origin.address || ''} onChange={handleOrderChange} ref={addressRef} placeholder="Enter address" />
      </div>

      <div className="form-group">
        <label>City</label>
        <input type="text" name="city" value={origin.city || ''} onChange={handleOrderChange} />
      </div>

      <div className="form-group">
        <label>State</label>
        <input type="text" name="state" value={origin.state || ''} onChange={handleOrderChange} />
      </div>

      <div className="form-group">
        <label>Postal Code</label>
        <input type="text" name="postal" value={origin.postal || ''} onChange={handleOrderChange} />
      </div>

      <div className="form-group">
        <label>Country</label>
        <input type="text" name="country" value={origin.country || ''} onChange={handleOrderChange} placeholder="Enter country" />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input type="date" name="rate" value={origin.rate || ''} onChange={handleOrderChange} placeholder="Enter rate" />
      </div>

      <div className="form-group">
        <label>Time</label>
        <input type="time" name="time" value={origin.time || ''} onChange={handleOrderChange} placeholder="Enter time" />
      </div>

      <div className="form-group">
        <label>Currency</label>
        <input type="text" name="currency" value={origin.currency || ''} onChange={handleOrderChange} placeholder="Enter currency code" />
      </div>

      <div className="form-group">
        <label>Equipment</label>
        <input type="text" name="equipment" value={origin.equipment || ''} onChange={handleOrderChange} placeholder="Enter equipment type" />
      </div>

      <div className="form-group">
        <label>Pickup PO</label>
        <input type="text" name="pickup_po" value={origin.pickup_po || ''} onChange={handleOrderChange} placeholder="Enter Pickup PO" />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea name="notes" value={origin.notes || ''} onChange={handleOrderChange} placeholder="Enter notes" />
      </div>

      <div className="form-group">
        <label>Packages</label>
        <input type="number" name="packages" value={origin.packages || ''} onChange={handleOrderChange} placeholder="Enter number of packages" />
      </div>

      <div className="form-group">
        <label>Weight</label>
        <input type="number" name="weight" value={origin.weight || ''} onChange={handleOrderChange} placeholder="Enter weight (kg)" />
      </div>

      <div className="form-group">
        <label>Dimensions</label>
        <input
          type="text"
          name="dimensions"
          value={origin.dimensions || ''}
          onChange={handleOrderChange}
          placeholder="Enter dimensions (e.g., 20x20x20 cm)"
        />
      </div>
      <button type="button" onClick={() => onRemove(index)} className="remove">
        Remove
      </button>
    </div>
  );
}

export default OrderOrigin;

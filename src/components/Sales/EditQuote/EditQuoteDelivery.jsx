import { useEffect, useRef } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

function EditQuoteDelivery({ delivery, index, onChange, onRemove }) {
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
    const mainAddress = `${streetNumber} ${route}`.trim(); // Combine street number and route

    onChange(index, {
      ...delivery,
      address: mainAddress,
      city: getComponent('locality', '', addressComponents),
      state: getComponent('administrative_area_level_1', '', addressComponents),
      country: getComponent('country', '', addressComponents),
      postal: getComponent('postal_code', '', addressComponents),
    });
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    const updatedPickup = { ...delivery, [name]: value };
    onChange(index, updatedPickup);
  };

  return (
    <fieldset className="form-section">
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Address</label>
          <input type="text" name="address" value={delivery.address} onChange={handleDeliveryChange} ref={addressRef} placeholder="Address" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>City</label>
          <input type="text" name="city" value={delivery.city} onChange={handleDeliveryChange} placeholder="City" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>State</label>
          <input type="text" name="state" value={delivery.state} onChange={handleDeliveryChange} placeholder="State" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Postal Code</label>
          <input
            type="tel"
            name="postal"
            value={delivery.postal}
            onChange={handleDeliveryChange}
            pattern="[0-9]{5}"
            maxLength="5"
            placeholder="Postal Code"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Country</label>
          <input type="text" name="country" value={delivery.country} onChange={handleDeliveryChange} placeholder="Country" />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Rate</label>
          <input type="number" name="rate" value={delivery.rate} onChange={handleDeliveryChange} placeholder="Rate" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Currency</label>
          <input type="text" name="currency" value={delivery.currency} onChange={handleDeliveryChange} placeholder="Currency" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Equipment</label>
          <input type="text" name="equipment" value={delivery.equipment} onChange={handleDeliveryChange} placeholder="Equipment" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Packages</label>
          <input type="number" name="packages" value={delivery.packages} onChange={handleDeliveryChange} placeholder="Packages" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Dimensions</label>
          <input
            type="text"
            name="dimensions"
            value={delivery.dimensions}
            onChange={handleDeliveryChange}
            placeholder="Enter dimensions (e.g., 20x20x20 cm)"
          />
        </div>
      </div>
      <div className="form-group" style={{ flex: 1 }}>
        <label>Notes</label>
        <textarea name="notes" value={delivery.notes} onChange={handleDeliveryChange} placeholder="Notes" />
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="org-des-remove"
        style={{ float: 'right', marginTop: '10px', display: 'inline-block' }}
      >
        <DeleteOutlined />
      </button>
    </fieldset>
  );
}

export default EditQuoteDelivery;

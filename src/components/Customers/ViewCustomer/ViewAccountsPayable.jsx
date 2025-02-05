import { useEffect, useRef } from 'react';

function ViewAccountsPayable({ formCustomer, setformCustomer }) {
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

    // Extract the main address (street_number + route)
    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim(); // Combine street number and route

    // Update the form customer state with the relevant values
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_ap_address: mainAddress, // Only store the main address in the state
      cust_ap_city: getComponent('locality', '', addressComponents),
      cust_ap_state: getComponent('administrative_area_level_1', '', addressComponents),
      cust_ap_country: getComponent('country', '', addressComponents),
      cust_ap_postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  return (
    <fieldset>
      <legend>Accounts Payable</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Name</label>
          <div>{formCustomer.cust_ap_name}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Street</label>
          <div>{formCustomer.cust_ap_address}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>City</label>
          <div>{formCustomer.cust_ap_city}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>State</label>
          <div>{formCustomer.cust_ap_state}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Country</label>
          <div>{formCustomer.cust_ap_country}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Postal Code</label>
          <div>{formCustomer.cust_ap_postal}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Unit No</label>
          <div>{formCustomer.cust_ap_unit_no}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Email</label>
          <div>{formCustomer.cust_ap_email}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Phone</label>
          <div>{formCustomer.cust_ap_phone}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Phone Ext</label>
          <div>{formCustomer.cust_ap_phone_ext}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Fax</label>
          <div>{formCustomer.cust_ap_fax}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewAccountsPayable;

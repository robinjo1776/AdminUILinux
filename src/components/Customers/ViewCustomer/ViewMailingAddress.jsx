import { useEffect, useRef } from 'react';

function ViewMailingAddressForm({ formCustomer, setformCustomer }) {
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
    const getComponent = (type, fallback) => (addressComponents.find((c) => c.types.includes(type)) || {}).long_name || fallback;

    const streetNumber = getComponent('street_number', '');
    const route = getComponent('route', '');
    const mainAddress = `${streetNumber} ${route}`.trim();

    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_mailing_address: mainAddress,
      cust_mailing_city: getComponent('locality', ''),
      cust_mailing_state: getComponent('administrative_area_level_1', ''),
      cust_mailing_country: getComponent('country', ''),
      cust_mailing_postal: getComponent('postal_code', ''),
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      sameAsPrimary: checked,
      ...(checked && {
        cust_mailing_address: '',
        cust_mailing_city: '',
        cust_mailing_state: '',
        cust_mailing_country: '',
        cust_mailing_postal: '',
        cust_mailing_unit_no: '',
      }),
    }));
  };

  return (
    <fieldset>
      <legend>Mailing Address</legend>

      {!formCustomer.sameAsPrimary && (
        <>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Street</label>
              <div>{formCustomer.cust_mailing_address}</div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>City</label>
              <div>{formCustomer.cust_mailing_city}</div>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label>State</label>
              <div>{formCustomer.cust_mailing_state}</div>
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Country</label>
              <div>{formCustomer.cust_mailing_country}</div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Postal Code</label>
              <div>{formCustomer.cust_mailing_postal}</div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Unit No</label>
              <div>{formCustomer.cust_mailing_unit_no}</div>
            </div>
          </div>
        </>
      )}
    </fieldset>
  );
}

export default ViewMailingAddressForm;

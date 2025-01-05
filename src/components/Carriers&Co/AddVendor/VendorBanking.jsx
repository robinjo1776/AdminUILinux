import { useEffect, useRef } from 'react';

function VendorBanking({ vendor, setVendor }) {
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
    setVendor((prevVendor) => ({
      ...prevVendor,
      mailing_address: mainAddress, // Only store the main address in the state
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  return (
    <fieldset className="form-section">
      <legend>Bank Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="legalName">Name</label>
          <input type="text" value={vendor.bank_name} onChange={(e) => setVendor({ ...vendor, bank_name: e.target.value })} id="legalName" />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Phone</label>
          <input type="text" value={vendor.bank_phone} onChange={(e) => setVendor({ ...vendor, bank_phone: e.target.value })} id="remitName" />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Email</label>
          <input type="text" value={vendor.bank_email} onChange={(e) => setVendor({ ...vendor, bank_email: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">US Account No</label>
          <input type="text" value={vendor.bank_us_acc_no} onChange={(e) => setVendor({ ...vendor, bank_us_acc_no: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Canadian Account No</label>
          <input type="text" value={vendor.bank_cdn_acc_no} onChange={(e) => setVendor({ ...vendor, bank_cdn_acc_no: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="mailingAddressStreet">Address</label>
          <input
            type="text"
            ref={addressRef}
            value={vendor.bank_address}
            onChange={(e) =>
              setVendor({
                ...vendor,
                bank_address: e.target.value,
              })
            }
            placeholder="Enter address"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default VendorBanking;

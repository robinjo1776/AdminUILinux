import { useEffect, useRef } from 'react';

interface CustomerProps {
  formCustomer: {
    cust_primary_address?: string;
    cust_primary_city?: string;
    cust_primary_state?: string;
    cust_primary_country?: string;
    cust_primary_postal?: string;
    cust_primary_unit_no?: string;
  };
  setformCustomer: (customer: (prevCustomer: any) => any) => void; // Replace `any` with stricter type if needed
}

const ViewPrimaryAddress: React.FC<CustomerProps> = ({ formCustomer, setformCustomer }) => {
  const addressRef = useRef<HTMLInputElement | null>(null);

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
    if (!addressRef.current) return;

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

  const updateAddressFields = (place: google.maps.places.PlaceResult) => {
    const addressComponents = place.address_components || [];

    // Helper function to extract address components
    const getComponent = (type: string, fallback: string) => addressComponents.find((c) => c.types.includes(type))?.long_name || fallback;

    const streetNumber = getComponent('street_number', '');
    const route = getComponent('route', '');
    const mainAddress = `${streetNumber} ${route}`.trim(); // Combine street number and route

    // Update customer state
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_primary_address: mainAddress,
      cust_primary_city: getComponent('locality', ''),
      cust_primary_state: getComponent('administrative_area_level_1', ''),
      cust_primary_country: getComponent('country', ''),
      cust_primary_postal: getComponent('postal_code', ''),
    }));
  };

  return (
    <fieldset>
      <legend>Primary Address</legend>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Street</label>
          <div>{formCustomer.cust_primary_address}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>City</label>
          <div>{formCustomer.cust_primary_city}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>State</label>
          <div>{formCustomer.cust_primary_state}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Country</label>
          <div>{formCustomer.cust_primary_country}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Postal Code</label>
          <div>{formCustomer.cust_primary_postal}</div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Unit No</label>
          <div>{formCustomer.cust_primary_unit_no}</div>
        </div>
      </div>
    </fieldset>
  );
};

export default ViewPrimaryAddress;

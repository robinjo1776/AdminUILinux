import { useEffect, useRef } from 'react';

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type PlaceResult = {
  address_components: AddressComponent[];
};

type FormCustomer = {
  cust_ap_name: string;
  cust_ap_address: string;
  cust_ap_city: string;
  cust_ap_state: string;
  cust_ap_country: string;
  cust_ap_postal: string;
  cust_ap_unit_no: string;
  cust_ap_email: string;
  cust_ap_phone: string;
  cust_ap_phone_ext: string;
  cust_ap_fax: string;
};

type ViewAccountsPayableProps = {
  formCustomer: FormCustomer;
  setformCustomer: React.Dispatch<React.SetStateAction<FormCustomer>>;
};

function ViewAccountsPayable({ formCustomer, setformCustomer }: ViewAccountsPayableProps) {
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
      const place = autocomplete.getPlace() as PlaceResult;
      if (!place || !place.address_components) {
        console.error('No valid address selected');
        return;
      }
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place: PlaceResult) => {
    const addressComponents = place.address_components;

    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim();

    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_ap_address: mainAddress,
      cust_ap_city: getComponent('locality', '', addressComponents),
      cust_ap_state: getComponent('administrative_area_level_1', '', addressComponents),
      cust_ap_country: getComponent('country', '', addressComponents),
      cust_ap_postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type: string, fallback: string, components: AddressComponent[]) => {
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

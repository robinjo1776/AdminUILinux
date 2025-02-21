import { useEffect, useRef } from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface AddressComponent {
  types: string[];
  long_name: string;
}

interface PlaceResult {
  address_components?: AddressComponent[];
}

interface VendorPrimaryAddressProps {
  vendor: Vendor;
  setVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhoneFax = (input: string) => /^[0-9+\-()\s]*$/.test(input);

function VendorPrimaryAddress({ vendor, setVendor }: VendorPrimaryAddressProps) {
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
    const addressComponents = place.address_components ?? [];
    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim();

    setVendor((prevVendor) => ({
      ...prevVendor,
      primary_address: mainAddress,
      primary_city: getComponent('locality', '', addressComponents),
      primary_state: getComponent('administrative_area_level_1', '', addressComponents),
      primary_country: getComponent('country', '', addressComponents),
      primary_postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type: string, fallback: string, components: AddressComponent[]) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  return (
    <fieldset>
      <legend>Primary Address</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          ref={addressRef}
          placeholder="Street"
          value={vendor.primary_address}
          onChange={(e) => setVendor({ ...vendor, primary_address: e.target.value.trim() })}
        />
        <input
          type="text"
          placeholder="City"
          value={vendor.primary_city}
          onChange={(e) => setVendor({ ...vendor, primary_city: e.target.value.trim() })}
        />
        <input
          type="text"
          placeholder="State"
          value={vendor.primary_state}
          onChange={(e) => setVendor({ ...vendor, primary_state: e.target.value.trim() })}
        />
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Country"
          value={vendor.primary_country}
          onChange={(e) => setVendor({ ...vendor, primary_country: e.target.value.trim() })}
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={vendor.primary_postal}
          onChange={(e) => setVendor({ ...vendor, primary_postal: e.target.value.trim() })}
        />
        <input
          type="email"
          placeholder="Email"
          value={vendor.primary_email}
          onChange={(e) => setVendor({ ...vendor, primary_email: validateEmail(e.target.value) ? e.target.value.trim() : vendor.primary_email })}
        />
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Phone"
          value={vendor.primary_phone}
          onChange={(e) => setVendor({ ...vendor, primary_phone: validatePhoneFax(e.target.value) ? e.target.value.trim() : vendor.primary_phone })}
        />
        <input
          type="text"
          placeholder="Fax"
          value={vendor.primary_fax}
          onChange={(e) => setVendor({ ...vendor, primary_fax: validatePhoneFax(e.target.value) ? e.target.value.trim() : vendor.primary_fax })}
        />
      </div>
    </fieldset>
  );
}

export default VendorPrimaryAddress;

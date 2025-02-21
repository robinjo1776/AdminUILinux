import { useEffect, useRef, useState } from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface VendorMailingAddressProps {
  vendor: Vendor;
  setVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

declare global {
  interface Window {
    google?: any;
  }
}

const VendorMailingAddress: React.FC<VendorMailingAddressProps> = ({ vendor, setVendor }) => {
  const addressRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!window.google || !window.google.maps || !addressRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, { types: ['address'] });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place || !place.address_components) return;
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place: google.maps.places.PlaceResult) => {
    const getComponent = (type: string) => {
      const component = place.address_components?.find((c) => c.types.includes(type));
      return component ? component.long_name : '';
    };
    setVendor((prev) => ({
      ...prev,
      mailing_address: getComponent('street_number') + ' ' + getComponent('route'),
      mailing_city: getComponent('locality'),
      mailing_state: getComponent('administrative_area_level_1'),
      mailing_country: getComponent('country'),
      mailing_postal: getComponent('postal_code'),
    }));
  };

  const validateInput = (name: string, value: string) => {
    let error = '';
    if (name.includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email format';
    } else if (name.includes('phone') || name.includes('fax')) {
      if (!/^[0-9-+()\s]*$/.test(value)) error = 'Invalid phone/fax format';
    } else if (/[^a-zA-Z0-9.,'\s-]/.test(value)) {
      error = 'Invalid characters';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setVendor((prev) => ({ ...prev, [name]: value.trim() }));
  };

  return (
    <fieldset>
      <legend>Mailing Address</legend>
      <div className="form-group">
        <label>
          Same as Primary Address
          <input type="checkbox" checked={vendor.sameAsPrimary} onChange={(e) => setVendor({ ...vendor, sameAsPrimary: e.target.checked })} />
        </label>
      </div>
      {!vendor.sameAsPrimary && (
        <>
          <div className="form-group">
            <label>Street</label>
            <input type="text" name="mailing_address" ref={addressRef} value={vendor.mailing_address} onChange={handleChange} placeholder="Street" />
            <span className="error">{errors.mailing_address}</span>
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="mailing_city" value={vendor.mailing_city} onChange={handleChange} placeholder="City" />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" name="mailing_state" value={vendor.mailing_state} onChange={handleChange} placeholder="State" />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" name="mailing_country" value={vendor.mailing_country} onChange={handleChange} placeholder="Country" />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input type="text" name="mailing_postal" value={vendor.mailing_postal} onChange={handleChange} placeholder="Postal Code" />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="mailing_phone" value={vendor.mailing_phone} onChange={handleChange} placeholder="Phone" />
            <span className="error">{errors.mailing_phone}</span>
          </div>
          <div className="form-group">
            <label>Fax</label>
            <input type="text" name="mailing_fax" value={vendor.mailing_fax} onChange={handleChange} placeholder="Fax" />
            <span className="error">{errors.mailing_fax}</span>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="mailing_email" value={vendor.mailing_email} onChange={handleChange} placeholder="Email" />
            <span className="error">{errors.mailing_email}</span>
          </div>
        </>
      )}
    </fieldset>
  );
};

export default VendorMailingAddress;

import React, { useEffect, useRef } from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface EditVendorBankingProps {
  formVendor: Vendor;
  setFormVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

// Sanitization functions
const sanitizeName = (value: string) => value.replace(/[^a-zA-Z\s-]/g, ''); // Only letters, spaces, and dashes
const sanitizeEmail = (value: string) => value.replace(/[^\w@.-]/g, ''); // Removes invalid email characters
const sanitizeNumber = (value: string) => value.replace(/\D/g, ''); // Removes non-numeric characters

const EditVendorBanking: React.FC<EditVendorBankingProps> = ({ formVendor, setFormVendor }) => {
  const addressRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeAutocomplete();
    } else if (!document.querySelector('#google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => initializeAutocomplete();
      document.head.appendChild(script);
    }
  }, []);

  const initializeAutocomplete = () => {
    if (!addressRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place || !place.address_components) return;

      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place: google.maps.places.PlaceResult) => {
    if (!place.address_components) return;

    const getComponent = (type: string) => place.address_components?.find((c) => c.types.includes(type))?.long_name || '';

    const streetNumber = getComponent('street_number');
    const route = getComponent('route');
    const formattedAddress = `${streetNumber} ${route}`.trim();

    setFormVendor((prevVendor) => ({
      ...prevVendor,
      bank_address: formattedAddress,
    }));
  };

  return (
    <fieldset className="form-section">
      <legend>Bank Details</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {/* Bank Name */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankName">Name</label>
          <input
            type="text"
            id="bankName"
            value={formVendor.bank_name ?? ''}
            onChange={(e) => {
              setFormVendor((prev) => ({ ...prev, bank_name: sanitizeName(e.target.value) }));
            }}
            maxLength={50}
            required
          />
        </div>

        {/* Bank Phone */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankPhone">Phone</label>
          <input
            type="tel"
            id="bankPhone"
            value={formVendor.bank_phone ?? ''}
            onChange={(e) => {
              setFormVendor((prev) => ({ ...prev, bank_phone: sanitizeNumber(e.target.value) }));
            }}
            maxLength={15}
            pattern="\d{10,15}"
            title="Enter a valid phone number"
            required
          />
        </div>

        {/* Bank Email */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankEmail">Email</label>
          <input
            type="email"
            id="bankEmail"
            value={formVendor.bank_email ?? ''}
            onChange={(e) => {
              setFormVendor((prev) => ({ ...prev, bank_email: sanitizeEmail(e.target.value) }));
            }}
            maxLength={100}
            required
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {/* US Account No */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankUsAccNo">US Account No</label>
          <input
            type="text"
            id="bankUsAccNo"
            value={formVendor.bank_us_acc_no ?? ''}
            onChange={(e) => {
              setFormVendor((prev) => ({ ...prev, bank_us_acc_no: sanitizeNumber(e.target.value) }));
            }}
            maxLength={20}
            required
          />
        </div>

        {/* Canadian Account No */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankCdnAccNo">Canadian Account No</label>
          <input
            type="text"
            id="bankCdnAccNo"
            value={formVendor.bank_cdn_acc_no ?? ''}
            onChange={(e) => {
              setFormVendor((prev) => ({ ...prev, bank_cdn_acc_no: sanitizeNumber(e.target.value) }));
            }}
            maxLength={20}
            required
          />
        </div>

        {/* Bank Address (Google Places API) */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankAddress">Address</label>
          <input
            type="text"
            id="bankAddress"
            ref={addressRef}
            value={formVendor.bank_address ?? ''}
            onChange={(e) => {
              setFormVendor((prev) => ({ ...prev, bank_address: e.target.value }));
            }}
            placeholder="Enter address"
            required
          />
        </div>
      </div>
    </fieldset>
  );
};

export default EditVendorBanking;

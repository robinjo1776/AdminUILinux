import { useEffect, useRef, useState, FC } from 'react';
import { Vendor } from '../../../types/VendorTypes';

interface VendorBankingProps {
  vendor: Vendor;
  setVendor: React.Dispatch<React.SetStateAction<Vendor>>;
}

const VendorBanking: FC<VendorBankingProps> = ({ vendor, setVendor }) => {
  const addressRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if ((window as any).google?.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if ((window as any).google?.maps) {
          initializeAutocomplete();
        }
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  const initializeAutocomplete = () => {
    if (!addressRef.current) return;
    const autocomplete = new (window as any).google.maps.places.Autocomplete(addressRef.current, {
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
    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim();
    setVendor((prevVendor) => ({ ...prevVendor, bank_address: mainAddress }));
  };

  const getComponent = (type: string, fallback: string, components: google.maps.GeocoderAddressComponent[]) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const validateAndSetVendor = (field: keyof Vendor, value: string) => {
    let error = '';
    let sanitizedValue = value.trim();

    switch (field) {
      case 'bank_name':
        sanitizedValue = sanitizedValue.replace(/[^a-zA-Z\s]/g, ''); // Keep only letters
        if (sanitizedValue.length < 2 || sanitizedValue.length > 50) {
          error = 'Bank name must be 2-50 characters long';
        }
        break;
      case 'bank_phone':
        sanitizedValue = sanitizedValue.replace(/\D/g, ''); // Keep only numbers
        if (sanitizedValue.length < 7) error = 'Phone must be at least 7 digits';
        break;
      case 'bank_email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedValue)) {
          error = 'Invalid email format';
        }
        break;
      case 'bank_us_acc_no':
        sanitizedValue = sanitizedValue.replace(/\D/g, ''); // Keep only numbers
        if (sanitizedValue.length !== 9) error = 'US Account No must be exactly 9 digits';
        break;
      case 'bank_cdn_acc_no':
        sanitizedValue = sanitizedValue.replace(/\D/g, ''); // Keep only numbers
        if (sanitizedValue.length < 7 || sanitizedValue.length > 12) error = 'Canadian Account No must be 7-12 digits';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    setVendor({ ...vendor, [field]: sanitizedValue });
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
            value={vendor.bank_name}
            onChange={(e) => validateAndSetVendor('bank_name', e.target.value)}
            id="bankName"
            placeholder="Name"
          />
          {errors.bank_name && <small className="error">{errors.bank_name}</small>}
        </div>

        {/* Bank Phone */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankPhone">Phone</label>
          <input
            type="text"
            value={vendor.bank_phone}
            onChange={(e) => validateAndSetVendor('bank_phone', e.target.value)}
            id="bankPhone"
            placeholder="Phone"
          />
          {errors.bank_phone && <small className="error">{errors.bank_phone}</small>}
        </div>

        {/* Bank Email */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankEmail">Email</label>
          <input
            type="text"
            value={vendor.bank_email}
            onChange={(e) => validateAndSetVendor('bank_email', e.target.value)}
            id="bankEmail"
            placeholder="Email"
          />
          {errors.bank_email && <small className="error">{errors.bank_email}</small>}
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {/* US Account No */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankUSAccNo">US Account No</label>
          <input
            type="text"
            value={vendor.bank_us_acc_no}
            onChange={(e) => validateAndSetVendor('bank_us_acc_no', e.target.value)}
            id="bankUSAccNo"
            placeholder="US Account No"
          />
          {errors.bank_us_acc_no && <small className="error">{errors.bank_us_acc_no}</small>}
        </div>

        {/* Canadian Account No */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankCdnAccNo">Canadian Account No</label>
          <input
            type="text"
            value={vendor.bank_cdn_acc_no}
            onChange={(e) => validateAndSetVendor('bank_cdn_acc_no', e.target.value)}
            id="bankCdnAccNo"
            placeholder="Canadian Account No"
          />
          {errors.bank_cdn_acc_no && <small className="error">{errors.bank_cdn_acc_no}</small>}
        </div>

        {/* Bank Address */}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="bankAddress">Address</label>
          <input
            type="text"
            ref={addressRef}
            value={vendor.bank_address}
            onChange={(e) => setVendor({ ...vendor, bank_address: e.target.value })}
            id="bankAddress"
            placeholder="Address"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default VendorBanking;

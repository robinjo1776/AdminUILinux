import { useEffect, useRef } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

type Origin = {
  address?: string;
  city?: string;
  state?: string;
  postal?: string;
  country?: string;
  date?: string;
  time?: string;
  currency?: string;
  equipment?: string;
  pickup_po?: string;
  phone?: string;
  packages?: number;
  weight?: number;
  dimensions?: string;
  notes?: string;
};

type EditOrderOriginProps = {
  setFormOrder: (updateFn: (prevOrder: any) => any) => void;
  order: any;
  origin?: Origin;
  index: number;
  onRemove: (index: number) => void;
};

function EditOrderOrigin({ setFormOrder, order, origin = {}, index, onRemove }: EditOrderOriginProps) {
  const addressRef = useRef<HTMLInputElement>(null);

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

    const getComponent = (type: string, fallback: string) => {
      const component = addressComponents.find((c) => c.types.includes(type));
      return component ? component.long_name : fallback;
    };

    const streetNumber = getComponent('street_number', '');
    const route = getComponent('route', '');
    const mainAddress = `${streetNumber} ${route}`.trim();

    setFormOrder((prevOrder) => ({
      ...prevOrder,
      origin_location: prevOrder.origin_location.map((p: Origin, idx: number) =>
        idx === index
          ? {
              ...p,
              address: mainAddress,
              city: getComponent('locality', ''),
              state: getComponent('administrative_area_level_1', ''),
              country: getComponent('country', ''),
              postal: getComponent('postal_code', ''),
            }
          : p
      ),
    }));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormOrder((prevOrder) => ({
      ...prevOrder,
      origin_location: prevOrder.origin_location.map((loc: Origin, idx: number) =>
        idx === index ? { ...loc, [name]: value } : loc
      ),
    }));
  };

  return (
    <fieldset className="form-section">
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Address</label>
          <input type="text" name="address" value={origin.address || ''} onChange={handleOrderChange} ref={addressRef} placeholder="Address" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>City</label>
          <input type="text" name="city" value={origin.city || ''} onChange={handleOrderChange} placeholder="City" />
        </div>
      </div>
      <button type="button" onClick={() => onRemove(index)} className="trash-bottom" style={{ float: 'right', marginTop: '10px' }}>
        <DeleteOutlined />
      </button>
    </fieldset>
  );
}

export default EditOrderOrigin;

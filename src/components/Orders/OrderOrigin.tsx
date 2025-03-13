import { useEffect, useRef, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Location } from '../../types/OrderTypes';

type Order = {
  origin_location: Location[];
};

type OrderOriginProps = {
  setFormOrder: (updateFn: (prevOrder: Order) => Order) => void;
  order: Order;
  origin: Location;
  index: number;
  onRemove: (index: number) => void;
};

function OrderOrigin({ setFormOrder, order, origin, index, onRemove }: OrderOriginProps) {
  const addressRef = useRef<HTMLInputElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(!!window.google?.maps);

  useEffect(() => {
    if (scriptLoaded) {
      initializeAutocomplete();
      return;
    }

    if (!document.querySelector('#google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setScriptLoaded(true);
        initializeAutocomplete();
      };
      document.head.appendChild(script);
    } else {
      // Wait for script to load and then initialize autocomplete
      const checkScriptLoad = setInterval(() => {
        if (window.google?.maps) {
          setScriptLoaded(true);
          clearInterval(checkScriptLoad);
          initializeAutocomplete();
        }
      }, 500);
    }
  }, [scriptLoaded]);

  const initializeAutocomplete = () => {
    if (!addressRef.current || !window.google?.maps) return;
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
      origin_location: prevOrder.origin_location.map((loc, idx) =>
        idx === index
          ? {
              ...loc,
              address: mainAddress,
              city: getComponent('locality', ''),
              state: getComponent('administrative_area_level_1', ''),
              country: getComponent('country', ''),
              postal: getComponent('postal_code', ''),
            }
          : loc
      ),
    }));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormOrder((prevOrder) => {
      const updatedOrigins = prevOrder.origin_location.map((loc, idx) => (idx === index ? { ...loc, [name]: value } : loc));
      return { ...prevOrder, origin_location: updatedOrigins };
    });
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

export default OrderOrigin;

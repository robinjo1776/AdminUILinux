import { useEffect, useRef } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Order, Location } from '../../../types/OrderTypes';

interface OrderDestinationProps {
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  order: Order;
  destination: Location;
  index: number;
  handleDestinationChange: (index: number, updatedDestination: Location) => void;
  handleRemoveDestination: (index: number) => void;
}

const OrderDestination: React.FC<OrderDestinationProps> = ({ setOrder, destination, index, handleRemoveDestination }) => {
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

    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim();

    setOrder((prevOrder) => ({
      ...prevOrder,
      destination_location: prevOrder.destination_location.map((p, idx) =>
        idx === index
          ? {
              ...p,
              address: mainAddress,
              city: getComponent('locality', '', addressComponents),
              state: getComponent('administrative_area_level_1', '', addressComponents),
              country: getComponent('country', '', addressComponents),
              postal: getComponent('postal_code', '', addressComponents),
            }
          : p
      ),
    }));
  };

  const getComponent = (type: string, fallback: string, components: google.maps.GeocoderAddressComponent[]): string => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setOrder((prevOrder) => ({
      ...prevOrder,
      destination_location: prevOrder.destination_location.map((loc, idx) => (idx === index ? { ...loc, [name]: value } : loc)),
    }));
  };

  return (
    <fieldset className="form-section">
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Address</label>
          <input type="text" name="address" value={destination.address || ''} onChange={handleOrderChange} ref={addressRef} placeholder="Address" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>City</label>
          <input type="text" name="city" value={destination.city || ''} onChange={handleOrderChange} placeholder="City" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>State</label>
          <input type="text" name="state" value={destination.state || ''} onChange={handleOrderChange} placeholder="State" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Postal Code</label>
          <input type="text" name="postal" value={destination.postal || ''} onChange={handleOrderChange} placeholder="Postal Code" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Country</label>
          <input type="text" name="country" value={destination.country || ''} onChange={handleOrderChange} placeholder="Country" />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Date</label>
          <input type="date" name="date" value={destination.date || ''} onChange={handleOrderChange} placeholder="Date" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Time</label>
          <input type="time" name="time" value={destination.time || ''} onChange={handleOrderChange} placeholder="Time" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Currency</label>
          <input type="text" name="currency" value={destination.currency || ''} onChange={handleOrderChange} placeholder="Currency" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Equipment</label>
          <input type="text" name="equipment" value={destination.equipment || ''} onChange={handleOrderChange} placeholder="Equipment" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Pickup PO</label>
          <input type="text" name="pickup_po" value={destination.pickup_po || ''} onChange={handleOrderChange} placeholder="Pickup PO" />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Phone</label>
          <input type="text" name="phone" value={destination.phone || ''} onChange={handleOrderChange} placeholder="Phone" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Packages</label>
          <input
            type="number"
            name="packages"
            value={destination.packages || ''}
            onChange={handleOrderChange}
            placeholder="Enter number of packages"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Weight</label>
          <input type="number" name="weight" value={destination.weight || ''} onChange={handleOrderChange} placeholder="Enter weight (kg)" />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Dimensions</label>
          <input
            type="text"
            name="dimensions"
            value={destination.dimensions || ''}
            onChange={handleOrderChange}
            placeholder="Enter dimensions (e.g., 20x20x20 cm)"
          />
        </div>
      </div>

      <div className="form-group" style={{ flex: 1 }}>
        <label>Notes</label>
        <textarea name="notes" value={destination.notes || ''} onChange={handleOrderChange} placeholder="Notes" />
      </div>

      <button type="button" onClick={() => handleRemoveDestination(index)} className="remove">
        <DeleteOutlined />
      </button>
    </fieldset>
  );
};

export default OrderDestination;

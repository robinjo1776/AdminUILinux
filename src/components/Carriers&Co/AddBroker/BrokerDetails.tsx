import { useEffect, useRef } from 'react';
import { Broker } from '../../../types/BrokerTypes';

interface BrokerDetailsProps {
  broker: Broker;
  setBroker: React.Dispatch<React.SetStateAction<Broker>>;
}

const BrokerDetails: React.FC<BrokerDetailsProps> = ({ broker, setBroker }) => {
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
    if (!place.address_components) return;
    const addressComponents = place.address_components;

    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim();

    setBroker((prevBroker) => ({
      ...prevBroker,
      broker_address: mainAddress,
      broker_city: getComponent('locality', '', addressComponents),
      broker_state: getComponent('administrative_area_level_1', '', addressComponents),
      broker_country: getComponent('country', '', addressComponents),
      broker_postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (
    type: string,
    fallback: string,
    components: google.maps.GeocoderAddressComponent[]
  ): string => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  return (
    <fieldset>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="brokerName">Name</label>
          <input
            type="text"
            value={broker.broker_name}
            onChange={(e) => setBroker({ ...broker, broker_name: e.target.value })}
            placeholder="Name"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressStreet">Street</label>
          <input
            type="text"
            ref={addressRef}
            value={broker.broker_address}
            onChange={(e) => setBroker({ ...broker, broker_address: e.target.value })}
            placeholder="Street"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCity">City</label>
          <input
            type="text"
            value={broker.broker_city}
            onChange={(e) => setBroker({ ...broker, broker_city: e.target.value })}
            placeholder="City"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressState">State</label>
          <input
            type="text"
            value={broker.broker_state}
            onChange={(e) => setBroker({ ...broker, broker_state: e.target.value })}
            placeholder="State"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressCountry">Country</label>
          <input
            type="text"
            value={broker.broker_country}
            onChange={(e) => setBroker({ ...broker, broker_country: e.target.value })}
            placeholder="Country"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="primaryAddressPostalCode">Postal Code</label>
          <input
            type="text"
            value={broker.broker_postal}
            onChange={(e) => setBroker({ ...broker, broker_postal: e.target.value })}
            placeholder="Postal Code"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default BrokerDetails;

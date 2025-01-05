import { useEffect, useRef } from "react";

function PrimaryAddress({ carrier, setCarrier }) {
  const addressRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places";
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
    const autocomplete = new window.google.maps.places.Autocomplete(
      addressRef.current,
      {
        types: ["address"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place || !place.address_components) {
        console.error("No valid address selected");
        return;
      }
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;

    // Extract the main address (street_number + route)
    const streetNumber = getComponent("street_number", "", addressComponents);
    const route = getComponent("route", "", addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim(); // Combine street number and route

    // Update the form customer state with the relevant values
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      primary_address: mainAddress, // Only store the main address in the state
      primary_city: getComponent("locality", "", addressComponents),
      primary_state: getComponent(
        "administrative_area_level_1",
        "",
        addressComponents
      ),
      primary_country: getComponent("country", "", addressComponents),
      primary_postal: getComponent("postal_code", "", addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  return (
    <fieldset>
      <legend>Primary Address</legend>

      <div className="form-group">
        <label htmlFor="primaryAddressStreet">Street</label>
        <input
          type="text"
          ref={addressRef}
          placeholder="Enter your address"
          value={carrier.primary_address}
          onChange={(e) =>
            setCarrier({
              ...carrier,
              primary_address: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="primaryAddressCity">City</label>
        <input
          type="text"
          value={carrier.primary_city}
          onChange={(e) =>
            setCarrier({
              ...carrier,
              primary_city: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="primaryAddressState">State</label>
        <input
          type="text"
          value={carrier.primary_state}
          onChange={(e) =>
            setCarrier({
              ...carrier,
              primary_state: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="primaryAddressCountry">Country</label>
        <input
          type="text"
          value={carrier.primary_country}
          onChange={(e) =>
            setCarrier({
              ...carrier,
              primary_country: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="primaryAddressPostalCode">Postal Code</label>
        <input
          type="text"
          value={carrier.primary_postal}
          onChange={(e) =>
            setCarrier({
              ...carrier,
              primary_postal: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="primaryAddressUnitNo">Phone</label>
        <input
          type="text"
          value={carrier.primary_phone}
          onChange={(e) =>
            setCarrier({
              ...carrier,
              primary_phone: e.target.value,
            })
          }
        />
      </div>
    </fieldset>
  );
}

export default PrimaryAddress;

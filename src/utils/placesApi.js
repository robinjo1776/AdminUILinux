// utils/placesApi.js

/**
 * Loads the Google Maps JavaScript API script.
 * @param {string} apiKey - The API key for Google Maps.
 * @returns {Promise} - Resolves with the Google Maps object if successful, rejects if there is an error.
 */
export const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = (error) => {
      console.error('Google Maps API script failed to load:', error);
      reject(error);
    };

    document.head.appendChild(script);
  });
};

/**
 * Initializes the Google Places Autocomplete on a given input element.
 * @param {HTMLInputElement} inputElement - The input element to attach autocomplete to.
 * @param {function} callback - Function to call with address components when a place is selected.
 */
export const initializeAutocomplete = (inputElement, callback) => {
  if (!window.google || !window.google.maps) {
    throw new Error('Google Maps JavaScript API is not loaded');
  }

  const autocomplete = new window.google.maps.places.Autocomplete(inputElement, {
    types: ['address'], // Adjust the types if necessary
    componentRestrictions: { country: 'us' } // Adjust the country if necessary
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place && place.address_components) {
      const addressComponents = place.address_components.reduce((acc, component) => {
        const type = component.types[0];
        switch (type) {
          case 'street_number':
            acc.street_number = component.long_name;
            break;
          case 'route':
            acc.route = component.long_name;
            break;
          case 'locality':
            acc.city = component.long_name;
            break;
          case 'administrative_area_level_1':
            acc.state = component.short_name;
            break;
          case 'country':
            acc.country = component.long_name;
            break;
          case 'postal_code':
            acc.postal_code = component.long_name;
            break;
          default:
            break;
        }
        return acc;
      }, {});

      callback(addressComponents);
    }
  });
};

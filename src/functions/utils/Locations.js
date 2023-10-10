
export const LocationSuggestions = async (userInput, callback) => {

    try {

      const autocomplete = new window.google.maps.places.AutocompleteService();
  
      autocomplete.getPlacePredictions(
        {
          input: userInput,
          componentRestrictions: { country: 'GH' }, // Restrict to Ghana
        },
  
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            callback(predictions);
          } else {
            console.error(status);
            callback([]);
          }
        }
      );
    }
    
    catch (error) {
      console.error(error);
      callback([]);
    }
};

export const LocationDetails = async (prediction, callback) => {

    const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));

    placesService.getDetails({ placeId: prediction.place_id }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        prediction.lat = place.geometry.location.lat();
        prediction.lng = place.geometry.location.lng();
        callback(prediction);
      } else {
        callback(status);
      }
    });

};
  
const GoogleServices = () => {
  const getPlacesPostCodeById = async (selectedOption) =>
    new Promise((resolve, reject) => {
      const { place_id } = selectedOption;
      if (!place_id) {
        reject('placeId not provided');
      }

      try {
        new window.google.maps.places.PlacesService(document.createElement('div')).getDetails(
          {
            placeId: place_id,
            fields: ['address_components', 'geometry'],
          },
          (details) => resolve({ ...details, ...selectedOption })
        );
      } catch (error) {
        reject(error);
      }
    });

  return { getPlacesPostCodeById };
};

export default GoogleServices();

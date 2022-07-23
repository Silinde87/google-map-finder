const interceptGoogleMap = () => {
  cy.intercept({
    method: 'GET',
    url: '/maps/api/mapsjs/gen_204*',
    hostname: 'maps.googleapis.com',
  }).as('googleMap');
};

const interceptAutocompleteGoogle = () => {
  cy.intercept({
    method: 'GET',
    url: '/maps/api/place/js/AutocompletionService*',
    hostname: 'maps.googleapis.com',
  }).as('autocompleteGoogle');
};

const interceptPlaceDetails = () => {
  cy.intercept({
    method: 'GET',
    url: '/maps/api/place/js/PlaceService*',
    hostname: 'maps.googleapis.com',
  }).as('placeDetails');
};

export default { interceptAutocompleteGoogle, interceptGoogleMap, interceptPlaceDetails };

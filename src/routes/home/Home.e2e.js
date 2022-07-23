import { ROUTES } from '../../globals/constants';
import {
  interceptAutocompleteGoogle,
  interceptGoogleMap,
  interceptPlaceDetails,
} from './../../../cypress/support/intercepts';

describe('Application', () => {
  beforeEach(() => {
    interceptAutocompleteGoogle();
    interceptGoogleMap();
    interceptPlaceDetails();
  });

  it('should render a map retrieved from google map API', () => {
    cy.visit(ROUTES.HOME);
    cy.wait('@googleMap');

    cy.findByTestId('map');
  });

  it('should get autocomplete suggestions after typing the input', () => {
    cy.findByTestId('autocomplete').type('123');
    cy.wait('@autocompleteGoogle');

    cy.findByTestId('options-wrapper').should('exist');
    cy.findByTestId('options-wrapper').children().should('have.length', 5);
  });

  it('should be able to click on suggestion from the list and hide the suggestions', () => {
    cy.findByTestId('options-wrapper').children().first().click();
    cy.wait('@placeDetails');

    cy.findByTestId('options-wrapper').should('not.exist');
  });

  it('should not show suggestions if not exists', () => {
    cy.findByTestId('autocomplete').type('customdirection');
    cy.wait('@autocompleteGoogle');

    cy.findByTestId('options-wrapper').should('not.exist');
  });
});

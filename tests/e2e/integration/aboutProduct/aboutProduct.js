import { Then, When, And, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getButtonAbout', () => cy.get('#btn-about1'));
Cypress.Commands.add('getEmptyStarRating', () =>
  cy.get('[aria-label="custom icon label text 4 of 5"]'),
);

Given('A user open catalog', () => {
  cy.visit(route.catalog);
  cy.intercept('GET', '/products/1', { fixture: 'oneProduct.json' });
  cy.intercept('PUT', '/products/1', { fixture: 'oneProduct.json' });
});

When('A user clicks about product', () => {
  cy.getButtonAbout().click();
});

And('A user change rating', () => {
  cy.getEmptyStarRating().click().should('have.class', 'mdi-star');
});

And('A add product to cart', () => {
  cy.contains('Add to cart').click();
});

Then('Change count cart', () => {
  cy.getCartCountFromHeader().should($count => {
    expect($count).to.contain('1');
  });
});

import { Then, When, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getButtonDelete', () => cy.get('#btn-delete1'));

Given('A user opens page catalog', () => {
  cy.intercept('GET', '/products*', { fixture: 'products.json' });
  cy.intercept('DELETE', '/products/1', { fixture: 'products.json' });
  cy.visit(route.catalog);
});

When('A user clicks button delete product', () => {
  cy.getButtonDelete().click({ force: true });
});

Then('The product is removed from the catalog', () => {
  cy.getButtonDelete().should('not.exist');
});

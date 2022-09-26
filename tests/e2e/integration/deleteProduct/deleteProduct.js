import { Then, When, Given, And } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getButtonDelete', () => cy.get('#btn-delete1'));

Given('A user login, enter email {string} and password {string}', (email, password) => {
  cy.login(email, password);
});

Given('A user opens page catalog', () => {
  cy.intercept('GET', '/products*', { fixture: 'products.json' });
  cy.intercept('DELETE', '/products/1', { fixture: 'products.json' });
  cy.visit(route.catalog);
});

When('A user clicks button delete product', () => {
  cy.getButtonDelete().click({ force: true });
});

And('Agree with delete product', () => {
  cy.contains('Agree').click();
});

Then('The product is removed from the catalog', () => {
  cy.getButtonDelete().should('not.exist');
});

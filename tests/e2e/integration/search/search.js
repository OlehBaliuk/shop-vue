import { Then, When, And, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getCheckboxSearchByName', () => cy.get('[data-test="searchByName"]'));
Cypress.Commands.add('getCategoryFilter', () => cy.get('[data-test="filter"]'));
Cypress.Commands.add('getSearchInput', () => cy.get('[data-test="searchField"]'));

Given('A user open catalog', () => {
  cy.visit(route.catalog);
  cy.intercept('GET', '/products?&_page=1&name_like=T-shirt', { fixture: 'searchProduct.json' }).as(
    'product',
  );
});

When('A user clicks category Filter', () => {
  cy.getCategoryFilter().click();
});

And('A user checked Search by name', () => {
  cy.getCheckboxSearchByName().check({ force: true });
});

And('A user types word {string}', word => {
  cy.getSearchInput().type(word).should('have.value', word);
});

Then('Show result by search', () => {
  cy.wait('@product');
  cy.getProductCart().should('be.visible');
});

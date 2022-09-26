import { Then, When, And, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getCheckboxSearchByPrice', () => cy.get('[data-test="searchByPrice"]'));
Cypress.Commands.add('getCategoryFilter', () => cy.get('[data-test="filter"]'));
Cypress.Commands.add('getInputFrom', () => cy.get('[data-test="from"]'));
Cypress.Commands.add('getInputTo', () => cy.get('[data-test="to"]'));

Given('A user open catalog', () => {
  cy.visit(route.catalog);
  cy.intercept('GET', '/products?&_page=*&price_gte=100&price_lte=200', {
    fixture: 'searchProduct.json',
  }).as('product');
});

When('A user clicks category Filter', () => {
  cy.getCategoryFilter().click();
});

And('A user checked Search by price', () => {
  cy.getCheckboxSearchByPrice().check({ force: true });
});

And('A user types price from {string} to {string}', (from, to) => {
  cy.getInputFrom().type(from).should('have.value', from);
  cy.getInputTo().type(to).should('have.value', to);
});

Then('Show result by search', () => {
  cy.wait('@product');
  cy.getProductCart().should('be.visible');
});

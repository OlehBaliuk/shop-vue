import { Then, When, And, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getInputNameProduct', () => cy.get('[data-test="nameText"]'));
Cypress.Commands.add('getInputDescriptionProduct', () => cy.get('[data-test="descriptionText"]'));
Cypress.Commands.add('getInputPriceProduct', () => cy.get('[data-test="price"]'));

Given('A user opens page add new product', () => {
  cy.visit(route.addNewProduct);
  cy.intercept('POST', '/products*', { fixture: 'products.json' });
  cy.intercept('GET', '/products*', { fixture: 'products.json' });
});

When('A user enter the name {string}', name => {
  cy.getInputNameProduct().type(name).should('have.value', name);
});

And('A user enter the description {string}', description => {
  cy.getInputDescriptionProduct().type(description).should('have.value', description);
});

And('A user enter the price {string}', price => {
  cy.getInputPriceProduct().type(price).should('have.value', price);
});

And('A user checked checkbox', () => {
  cy.getCheckbox().check({ force: true });
});

And('A user clicks submit button', () => {
  cy.getSubmitButton().click();
});

Then('The product add to catalog and redirect to catalog', () => {
  cy.url().should('include', route.catalog);
});

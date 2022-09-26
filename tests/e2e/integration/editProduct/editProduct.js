import { Then, When, And, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';
import product from '../../fixtures/oneProduct.json';

Cypress.Commands.add('getInputNameProduct', () => cy.get('[data-test="nameText"]'));
Cypress.Commands.add('getInputDescriptionProduct', () => cy.get('[data-test="descriptionText"]'));
Cypress.Commands.add('getInputPriceProduct', () => cy.get('[data-test="price"]'));
Cypress.Commands.add('getButtonEdit', () => cy.get('#btn-edit1'));

Given('A user opens page add new product', () => {
  cy.intercept('PUT', '/products/1', { fixture: 'oneProduct.json' });
  cy.intercept('GET', '/products/1', { fixture: 'oneProduct.json' });
  cy.visit(route.catalog);
  cy.getButtonEdit().click({ force: true });
});

When('A user enter the name {string}', name => {
  cy.getInputNameProduct()
    .should('have.value', product.name)
    .clear()
    .type(name)
    .should('have.value', name);
});

And('A user enter the description {string}', description => {
  cy.getInputDescriptionProduct()
    .should('have.value', product.description)
    .clear()
    .type(description)
    .should('have.value', description);
});

And('A user enter the price {string}', price => {
  cy.getInputPriceProduct()
    .should('have.value', product.price)
    .clear()
    .type(price)
    .should('have.value', price);
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

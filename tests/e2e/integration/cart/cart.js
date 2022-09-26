import { Then, When, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getIconPlus', () => cy.get('[data-test="increment"]'));
Cypress.Commands.add('getIconMinus', () => cy.get('[data-test="decrement"]'));
Cypress.Commands.add('getInputCountProduct', () => cy.get('[data-test="input"]'));
Cypress.Commands.add('getButtonDeleteProduct', () => cy.get('[data-test="delete"]'));
Cypress.Commands.add('getProductInCart', () => cy.get('[data-test="product"]'));
Cypress.Commands.add('getCartIcon', () => cy.get('[data-test="cart"]'));
Cypress.Commands.add('getButtonClearCart', () => cy.get('[data-test="clear"]'));

Given('A user open catalog', () => {
  cy.visit(route.catalog);
});

Given('A user add products to cart', () => {
  cy.contains('Add to cart').click();
});

Given('A user clicks cart', () => {
  cy.getCartIcon().click();
  cy.getCartCountFromHeader().should($count => {
    expect($count).to.contain('1');
  });
});

When('A user increments product', () => {
  cy.getIconPlus().click();
});
Then('Count increments', () => {
  cy.getInputCountProduct().should('have.value', 2);
});

When('A user decrements product', () => {
  cy.getIconMinus().click();
});
Then('Count decrements', () => {
  cy.getInputCountProduct().should('have.value', 1);
});

When('A user typed value', () => {
  cy.getInputCountProduct().clear().type(5);
});
Then('Count change', () => {
  cy.getInputCountProduct().should('have.value', 5);
});

When('A user clicks button delete', () => {
  cy.getButtonDeleteProduct().click();
});
Then('A cart is empty', () => {
  cy.getProductInCart().should('not.exist');
});

When('A user clicks button clear cart', () => {
  cy.getButtonClearCart().click();
});

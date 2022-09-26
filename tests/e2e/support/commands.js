import route from '../../../src/constants/routes';

Cypress.Commands.add('getSubmitButton', () => cy.get('[data-test="submit"]'));

Cypress.Commands.add('getLoginInput', () => cy.get('[data-test="login"]'));

Cypress.Commands.add('getPasswordInput', () => cy.get('[data-test="password"]'));

Cypress.Commands.add('getCheckbox', () => cy.get('[data-test="checkbox"]'));

Cypress.Commands.add('getCartCountFromHeader', () => cy.get('[data-test="cart-count"]'));

Cypress.Commands.add('getProductCart', () => cy.get('[data-test="product"]'));

Cypress.Commands.add('getButtonCancel', () => cy.get('[data-test="cancel"]'));

Cypress.Commands.add('getErrorMessage', () => cy.get('[data-test="error"]'));

Cypress.Commands.add('login', (email, password) => {
  cy.visit(route.login);
  cy.getLoginInput().type(email).should('have.value', email);
  cy.getPasswordInput().type(password).should('have.value', password);
  cy.getSubmitButton().click();
  cy.url().should('include', route.catalog);
});

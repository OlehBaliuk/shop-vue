Cypress.Commands.add('getSubmitButton', () => cy.get('[data-test="submit"]'));

Cypress.Commands.add('getLoginInput', () => cy.get('[data-test="login"]'));

Cypress.Commands.add('getPasswordInput', () => cy.get('[data-test="password"]'));

Cypress.Commands.add('getCheckbox', () => cy.get('[data-test="checkbox"]'));

Cypress.Commands.add('getCartCountFromHeader', () => cy.get('[data-test="cart-count"]'));

Cypress.Commands.add('getProductCart', () => cy.get('[data-test="product"]'));

Cypress.Commands.add('getButtonCancel', () => cy.get('[data-test="cancel"]'));

Cypress.Commands.add('getErrorMessage', () => cy.get('[data-test="error"]'));

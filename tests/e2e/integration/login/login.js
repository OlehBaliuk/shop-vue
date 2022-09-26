import { Then, When, And, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Given('A user opens page login', () => {
  cy.visit(route.login);
});

When('A user enter the email {string}', email => {
  cy.getLoginInput().type(email).should('have.value', email);
});

When('A user enter the password {string}', password => {
  cy.getPasswordInput().type(password).should('have.value', password);
});

And('A user clicks button submit', () => {
  cy.getSubmitButton().click();
});

And('A user clicks button clear', () => {
  cy.getButtonCancel().click();
});

Then('A user have to log in', () => {
  cy.url().should('include', route.catalog);
});

Then('Show error message', () => {
  cy.getErrorMessage().should('be.visible');
});

Then('Input fields are empty', () => {
  cy.getLoginInput().should('have.value', '');
  cy.getPasswordInput().should('have.value', '');
});

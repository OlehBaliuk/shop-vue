import { Then, When, And, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

const email = `${Math.random().toFixed(5)}@ab.ab`;

Cypress.Commands.add('getFirstNameInput', () => cy.get('[data-test="firstName"]'));
Cypress.Commands.add('getSecondNameInput', () => cy.get('[data-test="secondName"]'));

Given('A user opens page registration', () => {
  cy.visit(route.registration);
});

When('A user enter name {string}', name => {
  cy.getFirstNameInput().type(name).should('have.value', name);
});

When('A user enter second name {string}', secondName => {
  cy.getSecondNameInput().type(secondName).should('have.value', secondName);
});

When('A user checked checkbox', () => {
  cy.getCheckbox().check({ force: true });
});

When('A user enter the password {string}', password => {
  cy.getPasswordInput().type(password).should('have.value', password);
});

When('A user enter the correct email', () => {
  cy.getLoginInput().type(email).should('have.value', email);
});

And('A user clicks button submit', () => {
  cy.getSubmitButton().click();
});

Then('A user have to registration', () => {
  cy.url().should('include', route.catalog);
});

When('A user enter the incorrect email {string}', wrongEmail => {
  cy.getLoginInput().type(wrongEmail).should('have.value', wrongEmail);
});

Then('Show error message', () => {
  cy.getErrorMessage().should('be.visible');
});

And('A user clicks button clear', () => {
  cy.getButtonCancel().click();
});

Then('Input fields are empty', () => {
  cy.getLoginInput().should('have.value', '');
  cy.getPasswordInput().should('have.value', '');
});

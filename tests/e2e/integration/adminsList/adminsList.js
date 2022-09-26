import { Then, When, And, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getUsersSelect', () => cy.get('.v-select__slot'));
Cypress.Commands.add('getSelectedUsers', () => cy.get('[data-test="user81"]'));
Cypress.Commands.add('getNewAdmin', () => cy.get('[data-test="admin81"]'));
Cypress.Commands.add('getButtonRemoveAdmin', () => cy.get('[data-test="delete81"]'));

Given('A user login, enter email {string} and password {string}', (email, password) => {
  cy.login(email, password);
});

And('A user opens page admins', () => {
  cy.visit(route.admins);
  cy.url().should('include', route.admins);
});

When('A user clicks users select and type name {string}', name => {
  cy.getUsersSelect().click().type(name);
});

And('Clicks on user', () => {
  cy.getSelectedUsers().click();
});

Then('A user add to admins list', () => {
  cy.getNewAdmin().should('be.visible');
});

When('When a user clicks remove button', () => {
  cy.getButtonRemoveAdmin().click();
});

Then('A user will be remove from admins list', () => {
  cy.getNewAdmin().should('not.exist');
});

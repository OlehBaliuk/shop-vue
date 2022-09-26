import { Then, When, And, Given } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getButtonOpenForm', () => cy.get('[data-test="editPencil"]'));
Cypress.Commands.add('getProfileForm', () => cy.get('[data-test="profileForm"]'));
Cypress.Commands.add('getSelectContact', () => cy.get('.v-select__selections'));
Cypress.Commands.add('getPhoneInput', () => cy.get('[data-test="phoneInput"]'));
Cypress.Commands.add('getPopUpSuccess', () => cy.get('[data-test="success"]'));

Given('A user login, enter email {string} and password {string}', (email, password) => {
  cy.login(email, password);
});

Given('A user opens page profile', () => {
  cy.visit(route.profile);
});

Given('A user unlocks from', () => {
  cy.getButtonOpenForm().click();
});

When('A user cliks select contact', () => {
  cy.getProfileForm().should('be.visible');
  cy.getSelectContact().click();
});

And('A user clicks option a phone', () => {
  cy.contains('phone').click();
});

And('A user enter the phone number {string}', phone => {
  cy.getPhoneInput().clear().type(phone);
});

And('A user clicks submit button', () => {
  cy.getSubmitButton().click();
});

Then('The profile info update', () => {
  cy.getPopUpSuccess().should('be.visible');
});

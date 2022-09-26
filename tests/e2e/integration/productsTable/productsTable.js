import { Then, When, Given, And } from 'cypress-cucumber-preprocessor/steps';
import route from '../../../../src/constants/routes';

Cypress.Commands.add('getIconEdit', () => cy.get('[data-test="editIcon"]'));
Cypress.Commands.add('getButtonAddNewProduct', () => cy.get('[data-test="addNewProduct"]'));
Cypress.Commands.add('getIdField', () => cy.get('[data-test="idField"]'));
Cypress.Commands.add('getTableRow', () => cy.get('tbody>tr'));

Given('A user login, enter email {string} and password {string}', (email, password) => {
  cy.login(email, password);
});

And('A user opens page products table', () => {
  cy.visit(route.productsTable);
  cy.url().should('include', route.productsTable);
});

When('A user clicks icon edit product', () => {
  cy.getIconEdit().first().click();
});

Then('A user redirect to page edit product', () => {
  cy.url().should('include', 'edit-product');
});

When('A user clicks button add new product', () => {
  cy.getButtonAddNewProduct().click();
});

Then('A user redirect to page add new product', () => {
  cy.url().should('include', route.addNewProduct);
});

When('A user types id {string}', id => {
  cy.getIdField().type(id).should('have.value', id);
});

Then('In the table have to be one product with id {string}', () => {
  cy.getTableRow().should('have.length', 1);
  cy.getTableRow().should($id => {
    expect($id).to.contain('1');
  });
});

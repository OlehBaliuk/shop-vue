import route from '../../../src/constants/routes';

describe('Login', () => {
  it('should by open page login', () => {
    cy.visit(route.main);
    cy.contains('Login').click();
  });

  it('Fields have typed value, redirect to catalog', () => {
    cy.get('[data-test="login"]').type('abc@ab.ab').should('have.value', 'abc@ab.ab');
    cy.get('[data-test="password"]').type('12345678').should('have.value', '12345678');
    cy.get('[data-test="submit"]').click();
    cy.url().should('include', route.catalog);
  });
});

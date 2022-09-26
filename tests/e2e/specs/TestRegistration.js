import route from '../../../src/constants/routes';

describe('Registration', () => {
  const email = `${Math.random().toFixed(5)}@ab.ab`;
  const name = 'name';
  const password = '12345678';

  it('should by open page registration', () => {
    cy.visit(route.main);
    cy.contains('Registration').click();
  });

  it('Fields have typed value, redirect to catalog', () => {
    cy.get('[data-test="firstName"]').type(name).should('have.value', name);
    cy.get('[data-test="secondName"]').type(name).should('have.value', name);
    cy.get('[data-test="email"]').type(email).should('have.value', email);
    cy.get('[data-test="password"]').type(password).should('have.value', password);
    cy.get('[data-test="checkbox"]').check({ force: true });
    cy.get('[data-test="submit"]').click();
    cy.url().should('include', route.catalog);
  });
});

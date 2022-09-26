describe('Add new product', () => {
  beforeEach(() => {
    cy.intercept('POST', '/products*', { fixture: 'products.json' });
    cy.intercept('GET', '/products*', { fixture: 'products.json' });
  });

  it('should by open page add a product ', () => {
    cy.visit('/');
    cy.get('[data-test="products"]').click();
    cy.get('[data-test="actions"]').click();
    cy.get('[data-test="create"]').click();
  });

  it('Form is visible, fields have typed value, redirect to catalog', () => {
    cy.get('[data-test="nameText"]').type('Name').should('have.value', 'Name');
    cy.get('[data-test="descriptionText"]').type('Description').should('have.value', 'Description');
    cy.get('[data-test="price"]').type(1000).should('have.value', 1000);
    cy.get('[data-test="checkbox"]').check({ force: true });
    cy.get('[data-test="submit"]').click();
    cy.url().should('include', '/catalog');
  });
});

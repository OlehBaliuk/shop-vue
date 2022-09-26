describe('Cart', () => {
  beforeEach(() => {
    cy.intercept('GET', '/products*', { fixture: 'products.json' });
  });

  it('should by visit', () => {
    cy.visit('/');
    cy.contains('Add to cart').click();
  });

  it('should by add product to cart', () => {
    cy.get('[data-test="cart-count"]').should($count => {
      expect($count).to.contain('1');
    });
  });

  it('should by click cart icon', () => {
    cy.get('[data-test="cart"]').click();
  });

  it('increment product', () => {
    cy.get('[data-test="increment"]').click();
    cy.get('[data-test="input"]').should('have.value', 2);
  });

  it('decrement product', () => {
    cy.get('[data-test="decrement"]').click();
    cy.get('[data-test="input"]').should('have.value', 1);
  });

  it('input have typed value', () => {
    cy.get('[data-test="input"]').clear().type(5).should('have.value', 5);
  });

  it('delete product from cart', () => {
    cy.get('[data-test="delete"]').click();
    cy.get('[data-test="product"]').should('not.exist');
  });
});

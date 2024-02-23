describe('Product Page', () => {
  it('should open product page when click in product card', () => {
    cy.visit('/app/home')

    cy.get('[data-test="product-item1"]').click()
    cy.url().should('contain', '/app/product')
  })
})

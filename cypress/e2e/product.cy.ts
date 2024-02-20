describe('Product Page', () => {
  it('should  show cupons drawer and hide', () => {
    cy.visit('/app/home')

    cy.get('[data-test="product-item1"]').click()
    cy.url().should('contain', '/app/product')
  })

  it('should  show cupons drawer and hide', () => {
    cy.visit('/app/home')

    cy.get('[data-test="product-item1"]').click()

    cy.url().should('contain', '/app/product')
  })
})

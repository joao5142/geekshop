describe('Offer Page', () => {
  it('should to add product in cart', () => {
    cy.visit('/app/home')
    cy.get('[data-test="product-offer-item1"]').click()

    //offer view
    cy.get('[data-test="add-cart-btn"]').click()

    cy.url().should('contain', '/app/offer/') // => true
  })
})

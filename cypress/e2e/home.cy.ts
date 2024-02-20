describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/app/home')
  })

  it('should add product to cart when click increment btn on card', () => {
    cy.visit('/app/home')

    cy.get('[data-test="product-item1"]').find('[data-test="product-add-btn"]').click()
  })
  it('should  show cupons drawer', () => {
    cy.visit('/app/home')

    cy.get('[data-test="product-item1"]').find('[data-test="product-add-btn"]').click()
  })
})

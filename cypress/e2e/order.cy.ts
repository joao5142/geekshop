describe('Order Flux', () => {
  it('should to add product in cart', () => {
    cy.visit('/app/home')
    cy.get('[data-test="product-offer-item1"]').click()

    //offer view
    cy.get('[data-test="add-cart-btn"]').click()
    cy.get('[data-test="items-cart"]').click()

    //checkout - step 1
    cy.get('[data-test="checkout-name-field"]').type('João Pauulo')
    cy.get('[data-test="checkout-email-field"]').type('joaopaulo3687@gmail.com')
    cy.get('[data-test="checkout-phone-field"]').type('81991557058')
    cy.get('[data-test="checkout-continue-btn"]').click()

    //checkout - step 2
    cy.get('[data-test="checkout-cep-field"]').type('55920000')
    cy.get('body').click() // remove focus .focus() does not working

    cy.get('[data-test="checkout-street-field"]').type('Avenida frei damiao')
    cy.get('[data-test="checkout-street-number-field"]').type('44')
    cy.get('[data-test="checkout-continue-btn"]').click()

    //checkout - step 3

    cy.get('[data-test="checkout-payment-CREDIT-field"]').click()

    cy.get('[data-test="checkout-cpf-field"]').type('12871430403')
    cy.get('[data-test="checkout-card-user-field"]').type('João Paulo F')
    cy.get('[data-test="checkout-card-number-field"]').type('4444444444444444')
    cy.get('[data-test="checkout-card-cvv-field"]').type('128')
    cy.get('[data-test="checkout-card-date-field"]').type('122024')
    cy.get('[data-test="checkout-confirm-btn"]').click()

    cy.url().should('contain', '/app/order/') // => true
  })
})

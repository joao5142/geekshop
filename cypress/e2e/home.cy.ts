describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/app/home')
  })

  it('should  show cupons drawer and hide', () => {
    cy.visit('/app/home')

    cy.get('[data-test="drawer-image"]').click()
    cy.get('[data-test="cupons-drawer"').should('exist')
    cy.get('body').click()
    cy.get('[data-test="cupons-drawer"').should('be.hidden')
  })
})

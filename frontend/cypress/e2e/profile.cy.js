/// <reference types="Cypress" />
describe('TMC-Coach header', { defaultCommandTimeout: 20000 }, () => {
  context('logged in user', () => {
    before(() => {
      cy.login()
      cy.saveLocalStorage()
    })
    beforeEach(() => {
      cy.restoreLocalStorage()
    })
    it('can go to profilepage', () => {
      cy.profilepage()
      cy.url().should('include', '/profile')
      cy.contains('My Account').should('exist')
      cy.contains('E-mail: ').should('exist')
      cy.contains('My scheduled courses').should('exist')
    })
    it('can go to the mainpage from profilepage', () => {
      cy.profilepage()
      cy.contains('TMC Coach').click()
      cy.url().should('not.include', '/profile')
    })
  })
})
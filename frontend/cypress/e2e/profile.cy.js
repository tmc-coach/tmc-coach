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
      cy.orgspage()
      cy.contains('TMC Coach').click()
      cy.contains('@').click()
      cy.url().should('include', '/profile')
      cy.contains('My Account').should('exist')
      cy.contains('E-mail: ').should('exist')
    })
    it('can go to the mainpage from profilepage', () => {
      cy.orgspage()
      cy.contains('TMC Coach').click()
      cy.contains('@').click()
      cy.url().should('include', '/profile')
      cy.contains('TMC Coach').click()
      cy.url().should('not.include', '/profile')
    })
  })
})
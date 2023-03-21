/// <reference types="Cypress" />

describe('TMC-Coach organizations', { defaultCommandTimeout: 8000 }, () => {
  context('logged in user', () => {
    before(() => {
      cy.login()
      cy.saveLocalStorage()
    })
    beforeEach(() => {
      cy.restoreLocalStorage()
    })
    it('can click a organization', () => {
      cy.orgspage()
      cy.contains('Aalto BIZ').click()
      cy.url().should('include', '/orgs/aalto-biz')
    })
    it('can search organizations on searchbar', () => {
      cy.orgspage()
      cy.get('input[type=search]').type('mooc')
      cy.contains('Aalto BIZ').should('not.exist')
      cy.contains('MOOC').click()
      cy.url().should('include', '/orgs/mooc')
    })
    it('can see MOOC under frequently used organizations', () => {
      cy.orgspage()
      cy.contains('Aalto BIZ').should('be.visible')
      cy.get('div').eq(3).contains('MOOC')
    })
    it('can see Helsingin Yliopisto under frequently used organizations', () => {
      cy.orgspage()
      cy.contains('Aalto BIZ').should('be.visible')
      cy.get('div').eq(4).contains('Helsingin Yliopisto')
    })
  })
  context('logged out user', () => {
    it('is directed to login and cant go to organization page', () => {
      cy.orgspage()
      cy.url().should('include', '/login')
    })
  })
})
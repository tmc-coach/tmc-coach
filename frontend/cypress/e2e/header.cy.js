/// <reference types="Cypress" />

describe('TMC-Coach header', { defaultCommandTimeout: 8000 }, () => {
  context('logged in user', () => {
  beforeEach(() => {
      cy.login()
    })
    it('can see sign out button on home page', () => {
      cy.contains('Sign out')
    })
    it('can see sign out button on organizations page', () => {
      cy.orgspage()
      cy.contains('Sign out')
    })
    it('can see sign out button on course page', () => {
      cy.coursepage()
      cy.url().should('include', '/orgs/aalto-biz')
      cy.contains('Sign out')
    })
    it('on organizations page can click header link to get to home page', () => {
      cy.orgspage()
      cy.contains('TMC Coach').click()
      cy.url().should('not.include', '/orgs')
    })
    it('on course page can click header link to get to home page', () => {
      cy.coursepage()
      cy.contains('TMC Coach').click()
      cy.url().should('not.include', '/orgs/aalto-biz')
    })
    it('can use sign out button on organizations page', () => {
      cy.orgspage()
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('can use sign out button on course page', () => {
      cy.coursepage()
      cy.url().should('include', '/orgs/aalto-biz')
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
  })
  context('logged out user', () => {
    it('can not see sign out button on login page', () => {
      cy.contains('Sign out').should('not.exist')
    })
  })
})
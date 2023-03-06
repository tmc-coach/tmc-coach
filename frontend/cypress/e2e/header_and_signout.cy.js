/// <reference types="Cypress" />
describe('TMC-Coach header', { defaultCommandTimeout: 8000 }, () => {
  context('logged in user', () => {
    before(() => {
      cy.login()
      cy.saveLocalStorage()
    })
    beforeEach(() => {
      cy.restoreLocalStorage()
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
    it('can use sign out button and is directed to loginpage on homepage', () => {
      cy.homepage()
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('can use sign out button and is directed to loginpage on organizationspage', () => {
      cy.orgspage()
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('can use sign out button and is directed to loginpage on coursepage', () => {
      cy.coursepage()
      cy.url().should('include', '/orgs/aalto-biz')
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('can use sign out button and is directed to loginpage from courses exercises page', () => {
      cy.visit('http://localhost:3000/orgs/courses/900')
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
  })
  context('logged out user', () => {
    it('can not see sign out button on login page', () => {
      cy.loginpage()
      cy.contains('Sign out').should('not.exist')
    })
  })
})
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
    it('on organizationspage can click header link to get to homepage', () => {
      cy.orgspage()
      cy.contains('TMC Coach').click()
      cy.url().should('not.include', '/orgs')
    })
    it('on coursepage can click header link to get to homepage', () => {
      cy.coursepage()
      cy.contains('TMC Coach').click()
      cy.url().should('not.include', '/orgs/aalto-biz')
    })
    it('on homepage can use sign out button and is directed to loginpage', () => {
      cy.homepage()
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('on organizationspage can use sign out button and is directed to loginpage', () => {
      cy.orgspage()
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('on coursepage can use sign out button and is directed to loginpage', () => {
      cy.coursepage()
      cy.url().should('include', '/orgs/aalto-biz')
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('on courses exercisespage can use sign out button and is directed to loginpage', () => {
      cy.visit('http://localhost:3000/orgs/courses/900')
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
  })
  context('logged out user', () => {
    it('on loginpage can not see sign out button', () => {
      cy.loginpage()
      cy.contains('Sign out').should('not.exist')
    })
  })
})

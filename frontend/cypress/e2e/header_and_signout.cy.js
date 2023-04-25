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
    it('on organizations page can click header link to get to homepage', () => {
      cy.orgspage()
      cy.contains('TMC Coach').click()
      cy.url().should('not.include', '/orgs')
    })
    it('on organizations page description is not shown', () => {
      cy.orgspage()
      cy.contains('Schedule your courses and get feedback on your pace').should('not.exist')
    })
    it('on course page can click email to get to profilepage', () => {
      cy.coursepage()
      cy.contains('@').click()
      cy.url().should('not.include', '/orgs/aalto-biz')
      cy.url().should('include', '/profile')
    })
    it('on course page can use sign out button and is directed to login page', () => {
      cy.coursepage()
      cy.url().should('include', '/orgs/aalto-biz')
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
  })
  context('logged out user', () => {
    it('on login page sign out button is hidden and description shown', () => {
      cy.loginpage()
      cy.contains('Sign out').should('not.exist')
      cy.contains('Schedule your courses and get feedback on your pace')
    })
  })
})
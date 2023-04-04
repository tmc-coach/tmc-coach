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
    it('on organizations page can click header link to get to homepage', () => {
      cy.orgspage()
      cy.contains('TMC Coach').click()
      cy.url().should('not.include', '/orgs')
    })
    it('on organizations page description is not shown', () => {
      cy.orgspage()
      cy.contains('Schedule your courses and get feedback on your pace').should('not.exist')
    })
    it('on course page can click header link to get to homepage', () => {
      cy.coursepage()
      cy.contains('TMC Coach').click()
      cy.url().should('not.include', '/orgs/aalto-biz')
    })
    it.only('on organizations page can click email to get to profilepage', () => {
      cy.orgspage()
      cy.contains('TMC Coach').click()
      cy.contains('@').click()
      cy.url().should('not.include', '/orgs')
      cy.url().should('include', '/profile')
    })
    it.only('on course page can click email to get to profilepage', () => {
      cy.coursepage()
      cy.contains('@').click()
      cy.url().should('not.include', '/orgs/aalto-biz')
      cy.url().should('include', '/profile')
    })
    it('on course page description is not shown', () => {
      cy.coursepage()
      cy.contains('Schedule your courses and get feedback on your pace').should('not.exist')
    })
    it('on homepage can use sign out button and is directed to login page', () => {
      cy.homepage()
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('on organizations page can use sign out button and is directed to login page', () => {
      cy.orgspage()
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('on course page can use sign out button and is directed to login page', () => {
      cy.coursepage()
      cy.url().should('include', '/orgs/aalto-biz')
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('on courses exercises page can use sign out button and is directed to login page', () => {
      cy.visit('http://localhost:3000/orgs/courses/900')
      cy.contains('Sign out').click()
      cy.url().should('include', '/login')
    })
    it('on courses exercises page description is not shown', () => {
      cy.visit('http://localhost:3000/orgs/courses/900')
      cy.contains('Schedule your courses and get feedback on your pace').should('not.exist')
    })
  })
  context('logged out user', () => {
    it('on login page can not see sign out button', () => {
      cy.loginpage()
      cy.contains('Sign out').should('not.exist')
    })
    it('description is shown on login page', () => {
      cy.loginpage()
      cy.contains('Schedule your courses and get feedback on your pace')
    })
  })
})
/// <reference types="Cypress" />

describe('TMC-Coach courses', { defaultCommandTimeout: 8000 }, () => {
  context('logged in user', () => {
    before(() => {
      cy.clearLocalStorageSnapshot()
      cy.login()
      cy.saveLocalStorage()
    })
    beforeEach(() => {
      cy.restoreLocalStorage()
      cy.orgspage()
    })
    it('can click on a course', () => {
      cy.contains('Helsingin Yliopisto').click()
      cy.contains('Tilastotiede ja R tutuksi I, kevät 2023').click()
      cy.url().should('include', '/courses/1169')
    })
    it('can find a course using searchbar', () => {
      cy.contains('Helsingin Yliopisto').click()
      cy.get('input[type=search]').as('searchbar').should('be.visible')
      cy.get('@searchbar').should('not.be.disabled')
      cy.get('@searchbar').type('ad', { force: true })
      cy.contains('Introduction to Artificial Intelligence').should('not.exist')
      cy.contains('Advanced Course in Programming, autumn 2022, Online Exam 4')
    })
    it('searchbar is not visible if only one course', () => {
      cy.contains('Aalto BIZ').click()
      cy.contains('Search').should('not.exist')
    })
    it('no courses is indicated', () => {
      cy.contains('Abdullah Gul University').click()
      cy.contains('No available courses')
    })
  })

  context('logged out user', () => {
    it('is directed to login page and cant go to course page', () => {
      cy.coursepage()
      cy.url().should('include', '/login')
    })
  })
})
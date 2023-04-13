/// <reference types="Cypress" />

describe('TMC-Coach course exercises', { defaultCommandTimeout: 20000 }, () => {
  context('logged in user', () => {
    before(() => {
      cy.login()
      cy.saveLocalStorage()
    })
    beforeEach(() => {
      cy.restoreLocalStorage()
      cy.visit('http://localhost:3000/orgs/hy')
    })
    it('opens course exercises page', () => {
      cy.contains('Introduction to Artificial Intelligence').click()
      cy.url().should('include', '/orgs/courses/900')
      cy.contains('Awarded points:')
    })
    it('opens course exercises page without exercises', () => {
      cy.contains('Advanced Course in Programming, autumn 2022, Online Exam 4').click()
      cy.url().should('include', '/orgs/courses/1189')
      cy.contains('No exercises on this course')
    })
    it('404 page is shown if invalid page', () => {
      cy.on('uncaught:exception', () => {
        return false
      })
      cy.visit('http://localhost:3000/orgs/courses/none')
      cy.contains('The page you were looking for does not exist.')
    })
  })

  context('logged out user', () => {
    it('is directed to login page and cant go to courses exercises page', () => {
      cy.visit('http://localhost:3000/orgs/courses/aaaa')
      cy.url().should('include', '/login')
    })
  })
})
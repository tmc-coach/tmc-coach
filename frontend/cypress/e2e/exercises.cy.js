/// <reference types="Cypress" />

describe('TMC-Coach course exercises', () => {
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
  })

  context('logged out user', () => {
    it('is directed to login page and cant go to courses exercises page', () => {
      cy.visit('http://localhost:3000/orgs/courses/900')
      cy.url().should('include', '/login')
    })
  })
})
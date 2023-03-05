/// <reference types="Cypress" />

describe('TMC-Coach course exercises, user signed in', () => {
  before(() => {
    cy.clearLocalStorageSnapshot()
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
    cy.contains('Total completed exercises from the course:')
  })
  it('opens course exercises page without exercises', () => {
    cy.contains('Advanced Course in Programming, autumn 2022, Online Exam 4').click()
    cy.url().should('include', '/orgs/courses/1189')
    cy.contains('No exercises on this course')
  })
  it('able to sign out from courses exercises -page', () => {
    cy.contains('Introduction to Artificial Intelligence').click()
    cy.url().should('include', '/orgs/courses/900')
    cy.contains('Sign out').click()
    cy.url().should('include', '/login')
  })
})

describe('TMC-Coach course exercises, user not signed in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/orgs/courses/900')
  })
  it('unable open courses exercises page', () => {
    cy.url().should('not.include', '/orgs/courses/900')
  })
  it('user is directed to login page', () => {
    cy.url().should('not.include', '/orgs/courses/900')
    cy.url().should('include', '/login')
  })
})
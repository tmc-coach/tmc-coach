/// <reference types="Cypress" />

describe('TMC-Coach course exercises, user signed in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('input[name=username]').type(Cypress.env('tmcusername'))
    cy.get('input[name=password]').type(Cypress.env('tmcpassword'))
    cy.get('button[type=submit]').click()
    cy.contains('Organizations').click()
    cy.url().should('include', '/orgs')
    cy.wait(7000)
    cy.contains('Helsingin Yliopisto').click()
    cy.wait(7000)
    cy.url().should('include', '/orgs/hy')
    cy.contains('Helsingin Yliopisto')
    cy.contains('Courses')
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
  it('able to sign out from courses exercises -page', () => {
    cy.contains('Introduction to Artificial Intelligence').click()
    cy.url().should('include', '/orgs/courses/900')
    cy.contains('Sign out').click()
    cy.url().should('include', '/login')
  })
})

describe('TMC-Coach course exercises, user not signed in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('unable open courses exercises page', () => {
    cy.visit('http://localhost:3000/orgs/courses/900')
    cy.url().should('not.include', '/orgs/courses/900')
  })
  it('user is directed to login page', () => {
    cy.visit('http://localhost:3000/orgs/courses/900')
    cy.url().should('not.include', '/orgs/courses/900')
    cy.url().should('include', '/login')
  })
})
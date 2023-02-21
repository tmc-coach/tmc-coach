/// <reference types="Cypress" />

describe('TMC-Coach set deadline', { defaultCommandTimeout: 8000 }, () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('logged in user can go to the set deadline page', () => {
    cy.get('input[name=username]').type(Cypress.env('tmcusername'))
    cy.get('input[name=password]').type(Cypress.env('tmcpassword'))
    cy.get('button[type=submit]').click()
    cy.url().should('not.include', '/login')
    cy.visit('http://localhost:3000/orgs')
    cy.visit('http://localhost:3000/orgs/mooc')
    cy.visit('http://localhost:3000/orgs/courses/277/set_deadline')
    cy.contains('Set deadline for course 2013 Object-oriented programming, part 1').should('exist')
    cy.contains('Choose the deadline for this course').should('exist')
  })
  it('logged out user can not go to the set deadline page', () => {
    cy.visit('http://localhost:3000/orgs/courses/277/set_deadline')
    cy.url().should('include', '/login')
  })
})
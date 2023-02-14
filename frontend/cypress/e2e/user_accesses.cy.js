/// <reference types="Cypress" />

describe('TMC-Coach login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
    it('logged in user can not go to the login page', () => {
      cy.get('input[name=username]').type(Cypress.env('tmcusername'))
      cy.get('input[name=password]').type(Cypress.env('tmcpassword'))
      cy.get('button[type=submit]').click()
      cy.url().should('not.include', '/login')
      cy.visit('http://localhost:3000/login')
      cy.url().should('not.include', '/login')
    })
  })
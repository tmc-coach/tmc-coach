/// <reference types="Cypress" />

describe('TMC-Coach login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('opens the login page', () => {
    cy.url().should('include', '/login')
  })
  it('able to input credentials', () => {
    cy.get('input[name=username]').type('kayttajanimi')
    cy.get('input[name=password]').type('salasana')
  })
  it('unable to login with invalid credentials', () => {
    cy.get('input[name=username]').type('kayttajanimi')
    cy.get('input[name=password]').type('salasana')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/login')
    cy.get('.error').should('be.visible')
  })
  it('able to login with valid credentials', () => {
    cy.get('input[name=username]').type(Cypress.env('tmcusername'))
    cy.get('input[name=password]').type(Cypress.env('tmcpassword'))
    cy.get('button[type=submit]').click()
    cy.url().should('not.include', '/login')
  })
})
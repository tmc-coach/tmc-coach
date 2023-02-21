/// <reference types="Cypress" />

describe('TMC-Coach courses', () => {
  before(() => {
    cy.visit('http://localhost:3000')
    cy.get('a.text-white').should('be.visible')
  })
  beforeEach(() => {
    cy.get('input[name=username]').type(Cypress.env('tmcusername'))
    cy.get('input[name=password]').type(Cypress.env('tmcpassword'))
    cy.get('button[type=submit]').click()
    cy.visit('http://localhost:3000/orgs/hy')
  })
  it('opens courses page', () => {
    cy.url().should('include', '/orgs/hy')
  })
})
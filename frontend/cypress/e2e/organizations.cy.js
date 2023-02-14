/// <reference types="Cypress" />

describe('TMC-Coach login', { defaultCommandTimeout: 8000 }, () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('logged in user can go to the organization page', () => {
    cy.get('input[name=username]').type(Cypress.env('tmcusername'))
    cy.get('input[name=password]').type(Cypress.env('tmcpassword'))
    cy.get('button[type=submit]').click()
    cy.url().should('not.include', '/login')
    cy.contains('Organizations').click()
    cy.url().should('include', '/orgs')
  })
  it('logged in user can click a organization', () => {
    cy.get('input[name=username]').type(Cypress.env('tmcusername'))
    cy.get('input[name=password]').type(Cypress.env('tmcpassword'))
    cy.get('button[type=submit]').click()
    cy.url().should('not.include', '/login')
    cy.contains('Organizations').click()
    cy.url().should('include', '/orgs')
    cy.contains('Aalto BIZ').click()
    cy.url().should('include', '/orgs/aalto-biz')
  })
  it('user can search organizations on searchbar', () => {
    cy.visit('http://localhost:3000/orgs')
    cy.get('input[type=search]').type('mooc')
    cy.contains('Aalto BIZ').should('not.exist')
    cy.contains('MOOC').click()
    cy.url().should('include', '/orgs/mooc')
  })
})
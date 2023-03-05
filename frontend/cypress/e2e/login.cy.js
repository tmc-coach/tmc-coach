/// <reference types="Cypress" />

describe('TMC-Coach login', { defaultCommandTimeout: 8000 }, () => {
  beforeEach(() => {
    cy.homepage()
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
    cy.login()
    cy.saveLocalStorage()
  })
  it('sign out -button directs to the login page', () => {
    cy.restoreLocalStorage()
    cy.homepage()
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/login')
  })
  it('logged in user can not go to the login page', () => {
    cy.restoreLocalStorage()
    cy.loginpage()
    cy.url().should('not.include', '/login')
  })
  it('logged out user can not go to the front page', () => {
    cy.homepage()
    cy.url().should('include', '/login')
  })
})
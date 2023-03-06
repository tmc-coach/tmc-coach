/// <reference types="Cypress" />

describe('TMC-Coach login', { defaultCommandTimeout: 8000 }, () => {
  beforeEach(() => {
    cy.homepage()
  })
  it('opens the login page instead of home page when user not logged in', () => {
    cy.url().should('include', '/login')
  })
  it('user unable to login with invalid credentials', () => {
    cy.get('input[name=username]').type('kayttajanimi')
    cy.get('input[name=password]').type('salasana')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/login')
    cy.get('.error').should('be.visible')
  })
  it('user able to login with valid credentials', () => {
    cy.login()
    cy.saveLocalStorage()
  })
  it('logged in user can not go to the login page', () => {
    cy.restoreLocalStorage()
    cy.loginpage()
    cy.url().should('not.include', '/login')
  })
})
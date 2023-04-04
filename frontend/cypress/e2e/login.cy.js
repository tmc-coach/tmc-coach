/// <reference types="Cypress" />

describe('TMC-Coach login', { defaultCommandTimeout: 20000 }, () => {
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
  it('404 page is shown if invalid page', () => {
    cy.on('uncaught:exception', () => {
      return false
    })
    cy.visit('http://localhost:3000/none')
    cy.contains('The page you were looking for does not exist.')
  })
})
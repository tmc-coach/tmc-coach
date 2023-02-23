/// <reference types="Cypress" />

describe('TMC-Coach login, logged in user', { defaultCommandTimeout: 8000 }, () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('input[name=username]').type(Cypress.env('tmcusername'))
    cy.get('input[name=password]').type(Cypress.env('tmcpassword'))
    cy.get('button[type=submit]').click()
    cy.url().should('not.include', '/login')
  })
  it('logged in user can go to the organization page', () => {
    cy.contains('Organizations').click()
    cy.url().should('include', '/orgs')
  })
  it('logged in user can go to the course page', () => {
    cy.visit('http://localhost:3000/orgs/aalto-biz')
    cy.url().should('include', '/orgs/aalto-biz')
  })
  it('logged in user can click a organization', () => {
    cy.contains('Organizations').click()
    cy.url().should('include', '/orgs')
    cy.contains('Aalto BIZ').click()
    cy.url().should('include', '/orgs/aalto-biz')
  })
  it('logged in user can search organizations on searchbar', () => {
    cy.visit('http://localhost:3000/orgs')
    cy.get('input[type=search]').type('mooc')
    cy.contains('Aalto BIZ').should('not.exist')
    cy.contains('MOOC').click()
    cy.url().should('include', '/orgs/mooc')
  })
  it('logged in user can see MOOC under frequently used organizations', () => {
    cy.visit('http://localhost:3000/orgs')
    cy.contains('Aalto BIZ').should('be.visible')
    cy.get('div').eq(4).contains('MOOC')
    cy.get('div').eq(13).contains('MOOC')
  })
  it('logged in user can see Helsingin Yliopiso under frequently used organizations', () => {
    cy.visit('http://localhost:3000/orgs')
    cy.contains('Aalto BIZ').should('be.visible')
    cy.get('div').eq(4).contains('Helsingin Yliopisto')
    cy.get('div').eq(13).contains('Helsingin Yliopisto')
  })
})

describe('TMC-organizations, logged out user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('logged out user can not go to the organization page', () => {
    cy.visit('http://localhost:3000/orgs')
    cy.url().should('not.include', '/orgs')
  })
  it('logged out user is directed to login if on organization page', () => {
    cy.visit('http://localhost:3000/orgs')
    cy.url().should('include', '/login')
  })
  it('logged out user can not go to the course page', () => {
    cy.visit('http://localhost:3000/orgs/aalto-biz')
    cy.url().should('not.include', '/orgs/aalto-biz')
  })
  it('logged out user is directed to login if on course page', () => {
    cy.visit('http://localhost:3000/orgs/aalto-biz')
    cy.url().should('include', '/login')
  })
})
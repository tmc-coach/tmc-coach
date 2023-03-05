/// <reference types="Cypress" />

describe('TMC-Coach organizations, logged in user', { defaultCommandTimeout: 8000 }, () => {
  before(() => {
    cy.clearLocalStorageSnapshot()
    cy.login()
    cy.saveLocalStorage()
  })
  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  it('user can go to the organization page', () => {
    cy.homepage()
    cy.contains('Organizations').click()
    cy.url().should('include', '/orgs')
  })
  it('user can go to the course page', () => {
    cy.coursepage()
    cy.url().should('include', '/orgs/aalto-biz')
  })
  it('user can click a organization', () => {
    cy.orgspage()
    cy.contains('Aalto BIZ').click()
    cy.url().should('include', '/orgs/aalto-biz')
  })
  it('user can search organizations on searchbar', () => {
    cy.orgspage()
    cy.get('input[type=search]').type('mooc')
    cy.contains('Aalto BIZ').should('not.exist')
    cy.contains('MOOC').click()
    cy.url().should('include', '/orgs/mooc')
  })
  it('user can see MOOC under frequently used organizations', () => {
    cy.orgspage()
    cy.contains('Aalto BIZ').should('be.visible')
    cy.get('div').eq(4).contains('MOOC')
  })
  it('user can see Helsingin Yliopiso under frequently used organizations', () => {
    cy.orgspage()
    cy.contains('Aalto BIZ').should('be.visible')
    cy.get('div').eq(4).contains('Helsingin Yliopisto')
  })
})

describe('TMC-organizations, logged out user', () => {
  it('user can not go to the organization page', () => {
    cy.orgspage()
    cy.url().should('not.include', '/orgs')
  })
  it('user is directed to login if on organization page', () => {
    cy.orgspage()
    cy.url().should('include', '/login')
  })
  it('user can not go to the course page', () => {
    cy.coursepage()
    cy.url().should('not.include', '/orgs/aalto-biz')
  })
  it('user is directed to login if on course page', () => {
    cy.coursepage()
    cy.url().should('include', '/login')
  })
})
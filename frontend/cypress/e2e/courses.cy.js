/// <reference types="Cypress" />

describe('TMC-Coach courses, logged in user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('input[name=username]').type(Cypress.env('tmcusername'))
    cy.get('input[name=password]').type(Cypress.env('tmcpassword'))
    cy.get('button[type=submit]').click()
    cy.contains('Organizations').click()
  })
  it('can access courses page', () => {
    cy.contains('Helsingin Yliopisto').click()
    cy.url().should('include', '/orgs/hy')
    cy.contains('Helsingin Yliopisto')
    cy.contains('Only for the students of University of Helsinki! This organisation is used for courses arranged by the Department of Computer Science.')
    cy.contains('Courses')
  })
  it('can click on a course', () => {
    cy.contains('Helsingin Yliopisto').click()
    cy.contains('Tilastotiede ja R tutuksi I, kevät 2023').click()
    cy.url().should('include', '/courses/1169')
  })
  it('can find a course using searchbar', () => {
    cy.contains('Helsingin Yliopisto').click()
    cy.get('input[type=search]').type('ad')
    cy.contains('Introduction to Artificial Intelligence').should('not.exist')
    cy.contains('Advanced Course in Programming, autumn 2022, Online Exam 4')
  })
  it('searchbar is not visible if only one course', () => {
    cy.contains('Aalto BIZ').click()
    cy.contains('Search').should('not.exist')
  })
  it('no courses is indicated', () => {
    cy.contains('Abdullah Gul University').click()
    cy.contains('No available courses')
  })
  it('can logout', () => {
    cy.contains('Helsingin Yliopisto').click()
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/login')
  })
})

describe('TMC-Coach courses, logged out user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('cannot open courses page', () => {
    cy.visit('http://localhost:3000/orgs/aalto-biz')
    cy.url().should('not.include', '/orgs/aalto-biz')
  })
  it('user is directed to login page', () => {
    cy.visit('http://localhost:3000/orgs/aalto-biz')
    cy.url().should('not.include', '/orgs/aalto-biz')
    cy.url().should('include', '/login')
  })
})
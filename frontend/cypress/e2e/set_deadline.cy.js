/// <reference types="Cypress" />

describe('TMC-Coach set deadline', { defaultCommandTimeout: 8000 }, () => {
  context('logged in user', () => {
    before(() => {
      cy.login()
      cy.saveLocalStorage()
    })
    beforeEach(() => {
      cy.restoreLocalStorage()
    })
    it('can go to the set deadline page', () => {
      cy.homepage()
      cy.contains('Organizations').should('be.visible').click()
      cy.get('input[type=search]').type('mooc')
      cy.contains('MOOC').should('be.visible').click()
      cy.get('a[href="/orgs/courses/277"]').should('be.visible').click()
      cy.get('a[href="/orgs/courses/277/set_deadline"]').should('be.visible').click()
      cy.contains('Set deadline for course 2013 Object-oriented programming, part 1').should('exist')
      cy.contains('Choose the deadline for this course').should('exist')
    })
    it('can set deadline', () => {
      cy.setdeadlinepage()
      cy.contains('Set deadline for course 2013 Object-oriented programming, part 1').should('exist')
      cy.contains('Choose the deadline for this course').should('exist')
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.contains('4').click()
      cy.get('button[value=set_deadline]').click()
      cy.visit('http://localhost:3000/orgs/courses/277/set_deadline')
      cy.contains('2023-03-04').should('exist')
    })
    it('datapicker can be clicked', () => {
      cy.setdeadlinepage()
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click().click()
      cy.contains('18').click()
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--previous').click()
      cy.contains('28').click()
    })
    it('set deadline -page will show no deadlines if there is none', () => {
      cy.visit('http://localhost:3000/orgs/courses/1113/set_deadline')
      cy.contains('No deadlines chosen for this course').should('exist')
    })
  })
  context('logged out user', () => {
    it('is directed to login page and cant go to set_deadline page', () => {
      cy.setdeadlinepage()
      cy.url().should('include', '/login')
    })
  })
})

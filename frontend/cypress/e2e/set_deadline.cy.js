/// <reference types="Cypress" />

describe('TMC-Coach set deadline', { defaultCommandTimeout: 8000 }, () => {
  context('logged in user', () => {
    beforeEach(() => {
      cy.login()
    })
    it('can go to the set deadline page', () => {
      cy.contains('Organizations').should('be.visible').click()
      cy.get('input[type=search]').type('mooc')
      cy.contains('MOOC').should('be.visible').click()
      cy.get('a[href="/orgs/courses/277"]').should('be.visible').click()
      cy.get('a[href="/orgs/courses/277/set_deadline"]').should('be.visible').click()
      cy.contains('Set deadline for course 2013 Object-oriented programming, part 1').should('exist')
      cy.contains('Choose the deadline for this course').should('exist')
    })
    it('can set deadline', () => {
      cy.contains('Organizations').should('be.visible').click()
      cy.get('input[type=search]').type('mooc')
      cy.contains('MOOC').should('be.visible').click()
      cy.get('a[href="/orgs/courses/277"]').should('be.visible').click()
      cy.get('a[href="/orgs/courses/277/set_deadline"]').should('be.visible').click()
      cy.contains('Set deadline for course 2013 Object-oriented programming, part 1').should('exist')
      cy.contains('Choose the deadline for this course').should('exist')
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.contains('4').click()
      cy.get('button[value=set_deadline]').click()
      cy.visit('http://localhost:3000/orgs/courses/277/set_deadline')
      cy.contains('2023-03-04').should('exist')
    })
    it('datapicker can be clicked', () => {
      cy.visit('http://localhost:3000/orgs/courses/277/set_deadline')
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click().click()
      cy.contains('18').click()
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--previous').click()
      cy.contains('28').click()
    })
    it('set deadline -page will show no deadlines is there is none', () => {
      cy.visit('http://localhost:3000/orgs/courses/1113/set_deadline')
      cy.contains('No deadlines chosen for this course').should('exist')
    })
  })
  context('logged out user', () => {
    it('can not go to the set deadline page', () => {
      cy.visit('http://localhost:3000/orgs/courses/277/set_deadline')
      cy.url().should('include', '/login')
    })
  })
})

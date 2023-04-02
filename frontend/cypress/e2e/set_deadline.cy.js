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
      cy.contains(/Set a( new)? deadline/).should('exist')
    })
    it('can set deadline correctly on 06.02.2023', () => {
      cy.setdeadlinepage()
      const now = new Date(Date.parse('2023-02-06')).getTime()
      cy.clock(now, ['Date'])
      cy.contains('February 2023').should('be.visible')
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click().click()
      cy.get('div.react-datepicker__month-container').contains('4').click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('You have already set a deadline for this course.\nDo you want to set 2023.4.4 as your new deadline for this course?')
        return true
      })
      //cy.setdeadlinepage()
      cy.contains('2023-04-04').should('exist')
    })
    it('can set deadline correctly on 07.04.2023', () => {
      cy.setdeadlinepage()
      const now = new Date(Date.parse('2023-04-07')).getTime()
      cy.clock(now, ['Date'])
      cy.contains('April 2023').should('be.visible')
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.get('div.react-datepicker__month-container').contains('4').click()
      cy.get('button[value=set_deadline]').click()
      cy.setdeadlinepage()
      cy.contains('2023-05-04').should('exist')
    })

    it('datapicker can be clicked', () => {
      cy.setdeadlinepage()
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click().click()
      cy.contains('18').click()
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--previous').click()
      cy.contains('28').click()
    })
    it('can delete deadline if there is one added', () => {
      cy.setdeadlinepage()
      cy.get('button[value=delete_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('Are you sure you want to delete the deadline you have set for this course?')
      })
      cy.setdeadlinepage()
      cy.contains('You have not set a deadline for this course').should('exist')
    })
    it('deadline wont be deleted if cancel-button is clicked in confirmation window', () => {
      cy.setdeadlinepage()
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click().click()
      cy.get('div.react-datepicker__month-container').contains('10').click()
      cy.get('button[value=set_deadline]').click()
      cy.setdeadlinepage()
      cy.get('button[value=delete_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('Are you sure you want to delete the deadline you have set for this course?')
        return false
      })
      cy.contains('Delete deadline').should('exist')
    })
    it('delete deadline -button will not show if deadline hasnt been set', () => {
      cy.setdeadlinepage()
      cy.contains('Delete deadline').should('not.exist')
    })
    it('set deadline -page will show no deadlines if there is none', () => {
      cy.visit('http://localhost:3000/orgs/courses/1113')
      cy.contains('You have not set a deadline for this course').should('exist')
    })
    it('404 page is shown if invalid page', () => {
      cy.on('uncaught:exception', () => {
        return false
      })
      cy.visit('http://localhost:3000/orgs/courses/1169/set')
      cy.contains('The page you were looking for does not exist.')
    })
    it('set deadline -page shows a confirmation window', () => {
      cy.setdeadlinepage()
      cy.wait(7000)
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.get('div.react-datepicker__month-container').contains('18').click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('You have already set a deadline for this course.')
      })
      //cy.wait(5000)
      cy.setdeadlinepage()
      cy.contains('2023-04-18').should('be.visible')
    })
    it('a new deadline is not added if confirm-windows cancel-button is pressed', () => {
      cy.setdeadlinepage()
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.get('div.react-datepicker__month-container').contains('21').click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('You have already set a deadline for this course.')
        return false
      })
      cy.contains('2023-04-21').should('not.exist')
    })
    it('confirm-window will show up if the deadline is too close', () => {
      cy.setdeadlinepage()
      //cy.wait(7000)
      const now = new Date(Date.parse('2023-04-15')).getTime()
      cy.clock(now, ['Date'])
      cy.contains('April 2023').should('be.visible')
      cy.wait(7000)
      cy.get('div.react-datepicker__month-container').contains('17').click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        //expect(text).to.contains('Why do you want to set a deadline that is under four days away???')
        expect(text).to.contains('You have already set a deadline for this course.')
        return true
      })
      cy.setdeadlinepage()
      cy.contains('2023-04-17').should('be.visible')
    })
    it('a new deadline will not be set if the cancel-button is pressed', () => {
      cy.setdeadlinepage()
      const now = new Date(Date.parse('2023-02-15')).getTime()
      cy.clock(now, ['Date'])
      cy.contains('February 2023').should('be.visible')
      cy.get('div.react-datepicker__month-container').contains('17').click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('Why do you want to set a deadline that is under four days away???')
        return false
      })
      cy.contains('2023-02-17').should('not.exist')
    })
    it('the amount of checkpoints can be chosen', () => {
      cy.setdeadlinepage()
      cy.get('input[type=text]').type('1')
      cy.get('input[type=text]').should('have.value', '12')
      cy.get('input[type=text]').clear().type('1')
      cy.get('input[type=text]').should('have.value', '1')
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.get('div.react-datepicker__month-container').contains('21').click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('You have already set a deadline for this course.')
        return true
      })
    })
  })
  context('logged out user', () => {
    it('is directed to login page and cant go to set_deadline page', () => {
      cy.setdeadlinepage()
      cy.url().should('include', '/login')
    })
  })
})

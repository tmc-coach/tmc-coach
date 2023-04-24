/// <reference types="Cypress" />

describe('TMC-Coach set deadline', { defaultCommandTimeout: 20000 }, () => {

  const now = new Date()
  const dayNow = now.getDate()
  const monthNow = now.getMonth() + 1
  const yearNow = now.getFullYear().toString()

  context('logged in user', () => {
    before(() => {
      cy.login()
      cy.saveLocalStorage()
    })
    beforeEach(() => {
      cy.restoreLocalStorage()
      cy.setdeadlinepage()
    })
    it('can go to the set deadline page', () => {
      cy.homepage()
      cy.contains('Organizations').should('be.visible').click()
      cy.get('input[type=search]').type('mooc')
      cy.contains('MOOC').should('be.visible').click()
      cy.get('a[href="/orgs/courses/277"]').should('be.visible').click()
      cy.contains(/Set a( new)? deadline/).should('exist')
    })
    it('can set deadline correctly on next month 13th day', () => {
      // Next month 13th
      let nextMonth = monthNow + 1
      let year = yearNow
      if (nextMonth > 12) {
        nextMonth = 1
        year = yearNow + 1
      }
      let date = year.toString() + '-' + (nextMonth < 10) ? '0' + nextMonth : nextMonth.toString() + '-13'

      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.get('div.react-datepicker__month-container').contains('13').click()
      cy.get('button[value=set_deadline]').click()
      cy.contains(date).should('exist')
    })
    it('user can see the scheduled course in profile page', () => {
      cy.profilepage()
      cy.contains('My scheduled courses').should('exist')
      cy.get('a[href="/orgs/courses/277"]').should('be.visible').click()
    })
    it('can delete deadline if there is one added', () => {
      cy.get('button[value=delete_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('Are you sure you want to delete the deadline you have set for this course?')
      })
      cy.contains('You have not set a deadline for this course').should('exist')
    })
    it('deadline won\'t be deleted if cancel-button is clicked in confirmation window', () => {
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click().click()
      cy.get('div.react-datepicker__month-container').contains('10').click()
      cy.get('button[value=set_deadline]').click()
      cy.get('button[value=delete_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('Are you sure you want to delete the deadline you have set for this course?')
        return false // Simulates clicking "Cancel"
      })
      cy.contains('Delete deadline').should('exist')
    })
    it('delete deadline -button will not show if deadline hasnt been set', () => {
      cy.contains('Delete deadline').should('not.exist')
    })
    it('set deadline -page will show no deadlines if there is none', () => {
      cy.visit('http://localhost:3000/orgs/courses/1113')
      cy.contains('You have not set a deadline for this course').should('exist')
    })
    it('set deadline -page shows a confirmation window', () => {
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.get('div.react-datepicker__month-container').contains('18').click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contain('You have already set a deadline for this course.')
        return true
      })

      // Next month 18th
      let nextMonth = monthNow + 1
      let year = yearNow
      if (nextMonth > 12) {
        nextMonth = 1
        year = yearNow + 1
      }

      let date = '18-' + (nextMonth < 10) ? '0' + nextMonth : nextMonth.toString() + '-' + year.toString()
      cy.contains(date).should('be.visible')
    })
    it('confirm window will show up if the deadline is too close', () => {
      // Two days from now
      const twoDaysFromToday = new Date(now.setDate(dayNow + 2))
      let day = (twoDaysFromToday.getDate() < 10) ? '0' + twoDaysFromToday.getDate() : twoDaysFromToday.getDate().toString()
      let month = twoDaysFromToday.getMonth() + 1
      month = (month < 10) ? '0' + month : month.toString()
      let year = twoDaysFromToday.getFullYear().toString()

      cy.get('div.react-datepicker__day--0' + day).last().click() //.last().click()
      cy.get('select[type=string]').select('I want to choose the amount of checkpoints')
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('You are trying to have more checkpoints than there are days between today and the deadline.')
        return true
      })
      cy.contains(year + '-' + month + '-' + day).should('be.visible')
    })
    it('a new deadline will not be set if the cancel-button is pressed', () => {
      // Next month 17th
      let nextMonth = monthNow + 1
      let year = yearNow
      if (nextMonth > 12) {
        nextMonth = 1
        year = yearNow + 1
      }

      let date = year.toString() + '-' + (nextMonth < 10) ? '0' + nextMonth : nextMonth.toString() + '-17'

      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.get('div.react-datepicker__month-container').contains('17').click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('You have already set a deadline for this course.')
        return false
      })
      cy.contains(date).should('not.exist')
    })
    it('the amount of checkpoints can be chosen', () => {
      cy.setdeadlinepage()
      cy.get('select[type=string]').select('I want to choose the amount of checkpoints')
      cy.get('input[type=number]').clear().type('31')
      cy.get('input[type=number]').should('have.value', '12')
      cy.get('input[type=number]').clear().type('1{del}')
      cy.get('input[type=number]').should('have.value', '1')
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.get('div.react-datepicker__month-container').contains('21').click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('You have already set a deadline for this course.')
        return true
      })
    })
    it('the amount of added checkpoints is right', () => {
      cy.setdeadlinepage()
      cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click()
      cy.get('div.react-datepicker__month-container').contains(dayNow).click()
      cy.get('button[value=set_deadline]').click()
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('You have already set a deadline for this course.')
        return true
      })
      cy.get('p:visible:contains("2023-")').should('have.length', 4)
    })
  })
  context('logged out user', () => {
    it('is directed to login page and cant go to set_deadline page', () => {
      cy.setdeadlinepage()
      cy.url().should('include', '/login')
    })
  })
})
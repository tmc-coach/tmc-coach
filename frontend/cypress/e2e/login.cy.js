describe('TMC-Coach login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('opens the login page', () => {
    cy.url().should('include', '/login')
  })
  it('able to input credentials', () => {
    // Todo: fetch credentials from .env
    cy.get('input[name=username]').type('kayttajanimi')
    cy.get('input[name=password]').type('salasana')
  })
  it('unable to login with invalid credentials', () => {
    // Todo: fetch credentials from .env
    cy.get('input[name=username]').type('kayttajanimi')
    cy.get('input[name=password]').type('salasana')
    cy.get('button[type=submit]').click()
    cy.contains('Invalid credentials').should('exist')
  })
})
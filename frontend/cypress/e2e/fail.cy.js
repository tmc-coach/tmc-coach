/// <reference types="Cypress" />

describe('Test that should always fail', () => {
  it('fails', () => {
    expect(false).to.be.true
  })
})

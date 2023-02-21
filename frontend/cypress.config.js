const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000'
  },
  env: {
    tmcusername: 'tiina.kuisma@helsinki.fi',
    tmcpassword: 'Pirteläinen5!'
  }
})

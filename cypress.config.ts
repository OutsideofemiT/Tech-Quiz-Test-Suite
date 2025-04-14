import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:3001',
    setupNodeEvents(on, config) {
      // You can add plugins or reporters here if needed
    },
    supportFile: 'cypress/support/e2e.ts', // update if you're using .js
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
  },
});

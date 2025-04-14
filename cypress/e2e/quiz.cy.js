import questions from '../fixtures/questions.json';

describe('Tech Quiz E2E', () => {
  // Runs before each test to mock API and load the app
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', questions);
    cy.visit('/');
  });

  it('should load the quiz and display the start button', () => {
    cy.findByRole('button', { name: /start quiz/i }).should('exist');
  });

  it('should display the second question after answering the first', () => {
    cy.findByRole('button', { name: /start quiz/i }).click();
    cy.findByRole('button', { name: '1' }).should('exist').click();
    cy.findByText('What is 4 + 5?').should('exist');
  });

  it('should show the quiz completed and display score after last question', () => {
	cy.findByRole('button', { name: /start quiz/i }).click();
	cy.findByText('What is 2 + 2?').should('exist');
	cy.findByRole('button', { name: '1' }).click();
	cy.findByText('What is 4 + 5?').should('exist');
	cy.findByRole('button', { name: '2' }).click();
	cy.findByText('Quiz Completed').should('exist');
	cy.findByText(/your score:/i).should('exist');
	cy.findByRole('button', {name: /take new quiz/i}).click();
  });
})

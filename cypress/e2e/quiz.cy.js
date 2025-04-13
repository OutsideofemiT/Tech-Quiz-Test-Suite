import questions from '../fixtures/questions.json';


describe('Tech Quiz E2E', () => {
  it('should load the quiz and display the start button', () => {
	cy.intercept('GET', '/api/questions', questions);
	cy.visit('/');
	cy.findByRole('button', { name: /start quiz/i }).should('exist')
  });
});

it('should display the second question after answering the first', () => {
	cy.findByRole('button', { name: /start quiz/i }).click();
	cy.findByRole('button', { name: '1' }).should('exist').click();
	cy.findByText('What is 4 + 5?').should('exist');
  });
  



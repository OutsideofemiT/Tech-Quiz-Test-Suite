import React from 'react';
import Quiz from "../../client/src/components/Quiz";
import * as questionApi from '../../client/src/services/questionApi';


const mockQuestions = [
	{
	  question: 'What is 2 + 2?',
	  answers: [
		{ text: '3', isCorrect: false },
		{ text: '4', isCorrect: true },
	  ]
	},
	{
	  question: 'What is 4 + 5?',
	  answers: [
		{ text: '6', isCorrect: false },
		{ text: '9', isCorrect: true },
	  ]
	}
  ];
  
  beforeEach(() => {
	cy.stub(questionApi, 'getQuestions').resolves(mockQuestions);
  });
  
describe('<Quiz />', () => {
	it('should render the Start Quiz button', () => {
	cy.mount(<Quiz />);
	cy.findByRole('button', { name: /start quiz/i }).should('exist');
  });

it('should start the quiz and display the first question', () => {
	cy.mount(<Quiz />);
	cy.findByRole('button', { name: /start quiz/i }).click();
	cy.findByText('What is 2 + 2?').should('exist');
	cy.findAllByRole('button').should('have.length', 2); // 2 answer buttons
  });
});

it('should advance to the next question after the user clicks an answer button',() =>{
	cy.mount(<Quiz />);
	cy.findByRole('button', { name: '1' }).click();
	cy.findByText('What is 4 + 5?').should('exist')
});

it('should display the second question', () => {
	cy.mount(<Quiz />);
	cy.findByRole('button', { name: /start quiz/i }).click();
	cy.findByRole('button', { name: '1' }).click();
	cy.findByText('What is 4 + 5?').should('exist');
});

it('should show the quiz completed and display score after last question', () => {
	cy.mount(<Quiz />);
	cy.findByRole('button', { name: /start quiz/i }).click();
	cy.findByText('What is 2 + 2?').should('exist');
	cy.findByRole('button', { name: '1' }).click();
	cy.findByText('What is 4 + 5?').should('exist');
	cy.findByRole('button', { name: '2' }).click();
	cy.findByText('Quiz Completed').should('exist');
	cy.findByText(/your score:/i).should('exist');
	cy.findByRole('button', {name: /take new quiz/i}).click();
})
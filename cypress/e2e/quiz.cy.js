import questions from '../fixtures/questions.json';

cy.intercept('GET', '/api/questions', questions);

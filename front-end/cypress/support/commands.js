// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("truncateRecommendationsTable", () => {
    cy.request("DELETE", `http://localhost:5000/recommendations/e2eReset`, {});
});

Cypress.Commands.add("createNewRecommendation", (recommendation) => {
    cy.visit("http://localhost:3000/");
    cy.get("#inputName").type(recommendation.name);
    cy.get("#inputYoutube").type(recommendation.youtubeLink);

    cy.intercept("POST", `http://localhost:5000/recommendations`).as(
        "postNewRecommendation"
    );
    cy.get("#submitButton").click();
    cy.wait("@postNewRecommendation");
});

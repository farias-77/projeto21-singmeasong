import { faker } from "@faker-js/faker";

beforeEach(() => {
    cy.resetDatabase();
});

describe("Testa criação de recomendação", () => {
    it("Testa criação com name e youtubeLink válidos", () => {
        const recommendation = {
            name: faker.lorem.words(3),
            youtubeLink: "https://www.youtube.com/watch?v=zeJ3KpmgIwA",
        };

        cy.visit("http://localhost:3000/");
        cy.get("#inputName").type(recommendation.name);
        cy.get("#inputYoutube").type(recommendation.youtubeLink);

        cy.intercept("POST", `http://localhost:5000/recommendations`).as(
            "postNewRecommendation"
        );
        cy.get("#submitButton").click();
        cy.wait("@postNewRecommendation");

        cy.contains(recommendation.name).should("be.visible");
    });

    it("Testa criação com name repetido", () => {
        const recommendation = {
            name: faker.lorem.words(3),
            youtubeLink: "https://www.youtube.com/watch?v=zeJ3KpmgIwA",
        };

        cy.visit("http://localhost:3000/");
        cy.get("#inputName").type(recommendation.name);
        cy.get("#inputYoutube").type(recommendation.youtubeLink);

        cy.intercept("POST", `http://localhost:5000/recommendations`).as(
            "postNewRecommendation"
        );
        cy.get("#submitButton").click();
        cy.wait("@postNewRecommendation");
    });
});

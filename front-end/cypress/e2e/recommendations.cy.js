import { faker } from "@faker-js/faker";

beforeEach(() => {
    cy.truncateRecommendationsTable();
});

describe("Testa criação de recomendação", () => {
    it("Testa criação com name e youtubeLink válidos", () => {
        const recommendation = {
            name: faker.lorem.words(3),
            youtubeLink: "https://www.youtube.com/watch?v=zeJ3KpmgIwA",
        };

        cy.createNewRecommendation(recommendation);

        cy.contains(recommendation.name).should("be.visible");
    });

    it("Testa criação com name repetido", () => {
        const recommendation = {
            name: faker.lorem.words(3),
            youtubeLink: "https://www.youtube.com/watch?v=zeJ3KpmgIwA",
        };
        cy.createNewRecommendation(recommendation);
        cy.createNewRecommendation(recommendation);

        cy.on("window:alert", (t) => {
            expect(t).to.contains("Error creating recommendation!");
        });
    });
});

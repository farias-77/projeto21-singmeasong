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

describe("Testa upvote e downvpte", () => {
    it("Testa upvote", () => {
        const recommendation = {
            name: faker.lorem.words(3),
            youtubeLink: "https://www.youtube.com/watch?v=zeJ3KpmgIwA",
        };
        cy.createNewRecommendation(recommendation);

        cy.contains(0).as("recommendationScore");

        cy.get("#arrowUp").click();

        cy.on("@recommendationScore", (t) => {
            expect(t).to.contains(1);
        });
    });

    it("Testa downvote", () => {
        const recommendation = {
            name: faker.lorem.words(3),
            youtubeLink: "https://www.youtube.com/watch?v=zeJ3KpmgIwA",
        };
        cy.createNewRecommendation(recommendation);

        cy.contains(0).as("recommendationScore");

        cy.get("#arrowDown").click();

        cy.on("@recommendationScore", (t) => {
            expect(t).to.contains("-1");
        });
    });

    it("Testa downvote com delete", () => {
        const recommendation = {
            name: faker.lorem.words(3),
            youtubeLink: "https://www.youtube.com/watch?v=zeJ3KpmgIwA",
        };
        cy.createNewRecommendation(recommendation);

        cy.get("#arrowDown").click();
        cy.get("#arrowDown").click();
        cy.get("#arrowDown").click();
        cy.get("#arrowDown").click();
        cy.get("#arrowDown").click();
        cy.get("#arrowDown").click();

        cy.contains("No recommendations yet! Create your own :)").should(
            "be.visible"
        );
    });
});

describe("Testa botões header", () => {
    it("Testa botão top", () => {
        cy.visit("http://localhost:3000/");

        cy.get("#topButton").click();

        cy.url().should("equal", "http://localhost:3000/top");
    });

    it("Testa botão random", () => {
        cy.visit("http://localhost:3000/");

        cy.get("#randomButton").click();

        cy.url().should("equal", "http://localhost:3000/random");
    });

    it("Testa botão home", () => {
        cy.visit("http://localhost:3000/top");

        cy.get("#homeButton").click();

        cy.url().should("equal", "http://localhost:3000/");
    });
});

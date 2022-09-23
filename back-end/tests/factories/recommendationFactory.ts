import { faker } from "@faker-js/faker";

function recommendationFactory() {
    const recommendation = {
        name: faker.lorem.words(3),
        youtubeLink: "https://www.youtube.com/watch?v=6C-h6WG43dk",
    };

    return recommendation;
}

function completeRecommendationFactory() {
    const recommendation = {
        id: faker.datatype.number(),
        name: faker.lorem.words(3),
        youtubeLink: "https://www.youtube.com/watch?v=6C-h6WG43dk",
        score: faker.datatype.number(),
    };

    return recommendation;
}

export const recommendationFactories = {
    recommendationFactory,
    completeRecommendationFactory,
};

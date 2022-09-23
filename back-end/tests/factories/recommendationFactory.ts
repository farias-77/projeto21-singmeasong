import { faker } from "@faker-js/faker";
import { Recommendation } from "@prisma/client";

function recommendationFactory() {
    const recommendation = {
        name: faker.lorem.words(3),
        youtubeLink: "https://www.youtube.com/watch?v=6C-h6WG43dk",
    };

    return recommendation;
}

function completeRecommendationFactory(): Recommendation {
    const recommendation: Recommendation = {
        id: faker.datatype.number(),
        name: faker.lorem.words(3),
        youtubeLink: "https://www.youtube.com/watch?v=6C-h6WG43dk",
        score: 1,
    };

    return recommendation;
}

export const recommendationFactories = {
    recommendationFactory,
    completeRecommendationFactory,
};

import { faker } from "@faker-js/faker";

export default function recommendationFactory(){
    const recommendation = {
        name: faker.lorem.words(3),
        youtubeLink: "https://www.youtube.com/watch?v=6C-h6WG43dk"
    };

    return recommendation;
}
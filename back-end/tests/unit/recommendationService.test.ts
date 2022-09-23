import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationFactories } from "../factories/recommendationFactory";
import { jest } from "@jest/globals";
import { Recommendation } from "@prisma/client";
import { faker } from "@faker-js/faker";

describe("Testa service Insert", () => {
    it("Não deve criar uma recommendation com name repetido", () => {
        const recommendation =
            recommendationFactories.completeRecommendationFactory();

        jest.spyOn(
            recommendationRepository,
            "findByName"
        ).mockImplementationOnce((): any => recommendation);

        const promise = recommendationService.insert(recommendation);

        expect(promise).rejects.toEqual({
            type: "conflict",
            message: "Recommendations names must be unique",
        });
    });

    it("Deve criar recommendation (name válido)", async () => {
        const recommendation =
            recommendationFactories.completeRecommendationFactory();

        jest.spyOn(
            recommendationRepository,
            "findByName"
        ).mockImplementationOnce((): any => {
            return null;
        });

        jest.spyOn(recommendationRepository, "create").mockImplementationOnce(
            (): any => {}
        );

        await recommendationService.insert(recommendation);

        expect(recommendationRepository.create).toBeCalled();
    });
});

describe("Testa service upvote", () => {
    it("Testa com id inválido", () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce(
            (): any => {
                return null;
            }
        );

        jest.spyOn(
            recommendationRepository,
            "updateScore"
        ).mockImplementationOnce((): any => {});

        const promise = recommendationService.upvote(1);

        expect(recommendationRepository.updateScore).not.toBeCalled();
        expect(promise).rejects.toEqual({
            type: "not_found",
            message: "",
        });
    });

    it("Testa com id válido", async () => {
        const recommendation =
            recommendationFactories.completeRecommendationFactory();

        jest.spyOn(recommendationRepository, "find").mockImplementationOnce(
            (): any => {
                return recommendation;
            }
        );

        jest.spyOn(
            recommendationRepository,
            "updateScore"
        ).mockImplementationOnce((): any => {});

        await recommendationService.upvote(recommendation.id);

        expect(recommendationRepository.updateScore).toBeCalled();
    });
});

describe("Testa service get", () => {
    it("Deve retornar um array de recomendações", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

        const result = await recommendationService.get();

        expect(result).toBeInstanceOf(Array);
    });
});

describe("Testa service getTop", () => {
    it("Deve retornar um array de recomendações ordenadas", async () => {
        jest.spyOn(
            recommendationRepository,
            "getAmountByScore"
        ).mockResolvedValue([]);

        const amount = 1;
        const result = await recommendationService.getTop(amount);

        expect(result).toBeInstanceOf(Array);
    });
});

describe("Testa service truncateForE2eTesting", () => {
    it("Deve chamar repositoru", async () => {
        jest.spyOn(
            recommendationRepository,
            "truncateForE2eTesting"
        ).mockResolvedValue();

        const result = await recommendationService.truncateForE2eTesting();

        expect(recommendationRepository.truncateForE2eTesting).toBeCalled();
    });
});

describe("Testa service getRandom", () => {
    it("Deve retornar recomendação aleatória com filtros", async () => {
        const recommendation =
            recommendationFactories.completeRecommendationFactory();

        jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([
            recommendation,
            recommendation,
        ]);

        const result = await recommendationService.getRandom();

        expect(result).toBeInstanceOf(Object);
    });
});

describe("Testa service getScoreFilter", () => {
    it("Testa com random > 0.7", () => {
        const random = 1;

        const result = recommendationService.getScoreFilter(random);

        expect(result).toEqual("lte");
    });

    it("Testa com random < 0.7", () => {
        const random = 0.1;

        const result = recommendationService.getScoreFilter(random);

        expect(result).toEqual("gt");
    });
});

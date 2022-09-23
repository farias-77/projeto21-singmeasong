import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationFactories } from "../factories/recommendationFactory";
import { jest } from "@jest/globals";

describe("Testa service Insert", () => {
    it("Não deve criar uma recommendation com name repetido", () => {
        const recommendation =
            recommendationFactories.completeRecommendationFactory();

        jest.spyOn(
            recommendationRepository,
            "findByName"
        ).mockResolvedValueOnce(recommendation);

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
        ).mockResolvedValueOnce(null);

        jest.spyOn(recommendationRepository, "create").mockImplementationOnce(
            (): any => {}
        );

        await recommendationService.insert(recommendation);

        expect(recommendationRepository.create).toBeCalled();
    });
});

import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import * as errorHandlerMiddleware from "../../src/middlewares/errorHandlerMiddleware";
import { recommendationService } from "../../src/services/recommendationsService";
import recommendationFactory from "../factories/recommendationFacotry";
import * as errorUtils from "../../src/utils/errorUtils";
import { prisma } from "../../src/database";

describe("Testa service Insert", () => {
    it("Testa com name já existente -> deve retornar 409", async () => {
        const recommendation = recommendationFactory();

        jest.spyOn(
            recommendationRepository,
            "findByName"
        ).mockImplementationOnce((): any => {
            return {
                id: 1,
                name: recommendation.name,
                youtubeLink: recommendation.youtubeLink,
                score: 2,
            };
        });

        jest.spyOn(errorUtils, "conflictError").mockImplementationOnce(
            (message) => {
                return { type: "conflict", message: message ?? "" };
            }
        );

        // jest.spyOn(errorHandlerMiddleware, "errorHandlerMiddleware").mockImplementationOnce(() => {

        // })

        const result = await recommendationService.insert(recommendation);

        //expect().toBe(409)
    });
});

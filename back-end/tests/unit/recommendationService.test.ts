import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import * as errorHandlerMiddleware from "../../src/middlewares/errorHandlerMiddleware";
import { recommendationService } from "../../src/services/recommendationsService";
import recommendationFactory from "../factories/recommendationFacotry";
import * as errorUtils from "../../src/utils/errorUtils";
import { prisma } from "../../src/database";

describe("Testa service Insert", () => {
    it("Testa com name já existente -> deve retornar 409", async () => {
        const recommendation = recommendationFactory();
        const name = recommendation.name;
        // await prisma.recommendation.create({ data: recommendation });
        // const mockedRecommendation = prisma.recommendation.findUnique({
        //     where: { name: recommendation.name },
        // });

        // jest.spyOn(
        //     recommendationRepository,
        //     "findByName"
        // ).mockImplementationOnce(() => {
        //     return mockedRecommendation;
        // });

        jest.spyOn(
            recommendationRepository,
            "findByName"
        ).mockImplementationOnce((name): any => {
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

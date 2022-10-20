import {Request, Response} from "express";
import {container} from "tsyringe";
import GetUserUseCase from "./getUserUseCase";

export default class GetUserController {
    async handle(request: Request, response: Response) {
        const id = request.params.id;

        const getUserUseCase = container.resolve(GetUserUseCase)
        const result = await getUserUseCase.execute(String(id))

        return response.json(result)
    }
}
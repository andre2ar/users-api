import {Request, Response} from "express";
import CreateUserUseCase from "./createUserUseCase";
import {container} from "tsyringe";
import AppError from "../../../../errors/AppError";
import {validEmail} from "../../../../utils/emailValidation";

export default class CreateUserController {
    async handle(request: Request, response: Response) {
        const {
            email,
            password,
            first_name,
            last_name
        } = request.body

        if(!email || !password || !first_name || !last_name || !validEmail(email)) {
            throw new AppError("Invalid request, check your data")
        }

        const createUserUseCase = container.resolve(CreateUserUseCase)
        const result = await createUserUseCase.execute({
            email,
            password,
            first_name,
            last_name
        })

        return response.json(result)
    }
}
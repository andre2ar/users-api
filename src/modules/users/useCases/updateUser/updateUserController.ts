import {Request, Response} from "express";
import {container} from "tsyringe";
import UpdateUserUseCase from "./updateUserUseCase";
import AppError from "../../../../errors/AppError";
import {validEmail} from "../../../../utils/emailValidation";

export default class UpdateUserController {
    async handle(request: Request, response: Response) {
        const id = request.params.id;
        const {email, first_name, last_name} = request.body

        if(!email || !first_name || !last_name || !validEmail(email)) {
            throw new AppError("Invalid request, check your data")
        }

        const updateUserUseCase = container.resolve(UpdateUserUseCase)
        const result = await updateUserUseCase.execute(String(id), {email, first_name, last_name})

        return response.json(result)
    }
}
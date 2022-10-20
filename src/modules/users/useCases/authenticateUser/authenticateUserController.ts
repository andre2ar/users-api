import {Request, Response} from "express";
import {AuthenticateUserUseCase} from "./authenticateUserUseCase";
import {container} from "tsyringe";


export class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const {email, password} = request.body

        const authenticateClientUseCase = container.resolve(AuthenticateUserUseCase)
        const token = await authenticateClientUseCase.execute({
            email,
            password
        })

        return response.json(token)
    }
}

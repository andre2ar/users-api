import {Request, Response} from "express";
import {container} from "tsyringe";
import DeleteUserUseCase from "./deleteUserUseCase";

export default class DeleteUserController {
    async handle(request: Request, response: Response) {
        const id = request.params.id;

        const deleteUserUseCase = container.resolve(DeleteUserUseCase)
        await deleteUserUseCase.execute(String(id), String(request.user.id))

        return response.status(204).send()
    }
}
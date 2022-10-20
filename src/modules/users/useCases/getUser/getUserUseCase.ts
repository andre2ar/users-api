import {inject, injectable} from "tsyringe";
import IUsersRepository from "../../infra/IUsersRepository";
import AppError from "../../../../errors/AppError";

@injectable()
export default class GetUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {
    }

    async execute(id: string) {
        const user = await this.usersRepository.findById(id)

        if(!user) {
            throw new AppError("User not found", 404)
        }

        delete user.password

        return user
    }
}
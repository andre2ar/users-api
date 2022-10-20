import {inject, injectable} from "tsyringe";
import IUsersRepository from "../../infra/IUsersRepository";
import AppError from "../../../../errors/AppError";

@injectable()
export default class DeleteUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {
    }

    async execute(id: string, currentUserId: string) {
        if(currentUserId === id) {
            throw new AppError("You can not delete your own user")
        }

        const user = await this.usersRepository.findById(id)
        if(!user){
            throw new AppError("User not found", 404)
        }

        await this.usersRepository.delete(id)
    }
}
import {inject, injectable} from "tsyringe";
import IUsersRepository from "../../infra/IUsersRepository";
import AppError from "../../../../errors/AppError";
import UpdateUserDTO from "../../dtos/UpdateUserDTO";

@injectable()
export default class UpdateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {
    }

    async execute(id: string, {email, first_name, last_name}: UpdateUserDTO) {
        const user = await this.usersRepository.findById(id)
        if(!user) {
            throw new AppError("User not found", 404)
        }

        const isChangingEmail = user.email !== email
        if(isChangingEmail) {
            const sameEmailUser = await this.usersRepository.findByEmail(email)
            if(sameEmailUser) {
                throw new AppError("This email is being used by another user")
            }
        }

        const updatedUser = await this.usersRepository.update(id, {email, first_name, last_name})

        delete updatedUser.password

        return updatedUser
    }
}
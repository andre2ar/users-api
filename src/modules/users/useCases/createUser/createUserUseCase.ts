import {inject, injectable} from "tsyringe";
import IUsersRepository from "../../infra/IUsersRepository";
import AppError from "../../../../errors/AppError";
import IHashProvider from "../../providers/HashProvider/models/IHashProvider";

interface ICreateClient {
    email: string
    password: string
    first_name: string
    last_name: string
}

@injectable()
export default class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {
    }

    async execute({password, email, last_name, first_name}: ICreateClient) {
        const userExists = await this.usersRepository.findByEmail(email)

        if(userExists) {
            throw new AppError("User already exists")
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = await this.usersRepository.create({
            email,
            password: hashedPassword,
            last_name,
            first_name
        })

        return {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        }
    }
}
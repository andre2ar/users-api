import {sign} from "jsonwebtoken";
import AppError from "../../../../errors/AppError";
import {inject, injectable} from "tsyringe";
import IUsersRepository from "../../infra/IUsersRepository";
import IHashProvider from "../../providers/HashProvider/models/IHashProvider";

interface IAuthenticateClient {
    email: string
    password: string
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {
    }

    async execute({email, password}: IAuthenticateClient) {
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError("Invalid email or password", 401)
        }

        const passwordMatch = await this.hashProvider.compareHash(password, user.password)

        if(!passwordMatch) {
            throw new AppError("Invalid username or password", 401)
        }

        const token = sign({
            id: user.id,
            email,
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "1d"
        })

        return {
            token
        }
    }
}

import {v4 as uuid} from "uuid";
import IUsersRepository from "../IUsersRepository";
import UpdateUserDTO from "../../dtos/UpdateUserDTO";
import UserDTO from "../../dtos/UserDTO";
import CreateUserDTO from "../../dtos/CreateUserDTO";
import AppError from "../../../../errors/AppError";

export default class MemoryUserRepository implements IUsersRepository {
    private users: UserDTO[] = [];
    public async findById(id: string): Promise<any> {
        return this.users.find(user => user.id === id);
    }

    public async findByEmail(email: string): Promise<any> {
        return this.users.find(user => user.email === email)
    }

    create(data: CreateUserDTO): Promise<any> {
        const user = {
            id: uuid(),
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password
        }

        this.users.push(user)

        return Promise.resolve(user);
    }

    delete(userId: string): Promise<any> {
        const index = this.users.findIndex(user => user.id === userId)

        this.users.splice(index, 1)

        return Promise.resolve(undefined);
    }

    update(userId: string, data: UpdateUserDTO): Promise<any> {
        const user = this.users.find(user => user.id === userId)
        if(!user) {
            throw new AppError("User not found")
        }

        user.first_name = data.first_name
        user.last_name = data.last_name
        user.email = data.email

        return Promise.resolve(user);
    }
}
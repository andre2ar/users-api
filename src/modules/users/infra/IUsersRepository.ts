import CreateUserDTO from "../dtos/CreateUserDTO";
import UpdateUserDTO from "../dtos/UpdateUserDTO";

interface IUsersRepository {
    create(data: CreateUserDTO): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findById(id: string): Promise<any>;

    update(userId: string, data: UpdateUserDTO): Promise<any>
    delete(userId: string): Promise<any>
}

export default IUsersRepository;
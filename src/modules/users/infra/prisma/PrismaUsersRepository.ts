import IUserRepository from "../IUsersRepository";
import {prisma} from "../../../../infra/prisma/prismaClient";
import CreateUserDTO from "../../dtos/CreateUserDTO";
import UpdateUserDTO from "../../dtos/UpdateUserDTO";

export default class PrismaUsersRepository implements IUserRepository {
    create({email, password, last_name, first_name}: CreateUserDTO): Promise<any> {
         return prisma.users.create({
            data: {
                email,
                password,
                last_name,
                first_name
            }
        })
    }

    findByEmail(email: string): Promise<any> {
       return prisma.users.findFirst({
            where: {
                email
            }
        })
    }

    findById(id: string): Promise<any> {
        return prisma.users.findFirst({
            where: {
                id
            }
        })
    }

    update(userId: string, data: UpdateUserDTO): Promise<any> {
        return prisma.users.update({
            where: {
                id: userId
            },
            data: {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name
            }
        })
    }

    delete(userId: string): Promise<any> {
        return prisma.users.delete({
            where: {
                id: userId
            }
        })
    }
}
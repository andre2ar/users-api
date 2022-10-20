import "reflect-metadata"
import {container} from "tsyringe";
import IUsersRepository from "../modules/users/infra/IUsersRepository";
import PrismaUsersRepository from "../modules/users/infra/prisma/PrismaUsersRepository";

import '../modules/users/providers'

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    PrismaUsersRepository
)
import "reflect-metadata"
import 'dotenv/config';
import {describe} from "@jest/globals";
import MemoryUserRepository from "../../infra/memory/MemoryUserRepository";
import CreateUserUseCase from "../createUser/createUserUseCase";
import AppError from "../../../../errors/AppError";
import FakeHashProvider from "../../providers/HashProvider/fakes/FakeHashProvider";

let createUserUseCase: CreateUserUseCase
let memoryUserRepository: MemoryUserRepository
let fakeHashProvider: FakeHashProvider
describe('CreateUser', () => {
    beforeEach(() => {
        memoryUserRepository = new MemoryUserRepository()
        fakeHashProvider = new FakeHashProvider()

        createUserUseCase = new CreateUserUseCase(memoryUserRepository, fakeHashProvider)
    });

    it('should be able to create a new user', async () => {
        const user = await createUserUseCase.execute({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with an used email', async function () {
        await createUserUseCase.execute({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        });

        await expect(createUserUseCase.execute({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        })).rejects.toBeInstanceOf(AppError);
    });
});
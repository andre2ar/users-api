import "reflect-metadata"
import 'dotenv/config';
import {describe} from "@jest/globals";
import {AuthenticateUserUseCase} from "./authenticateUserUseCase";
import MemoryUserRepository from "../../infra/memory/MemoryUserRepository";
import AppError from "../../../../errors/AppError";
import FakeHashProvider from "../../providers/HashProvider/fakes/FakeHashProvider";

let authenticateUserUseCase: AuthenticateUserUseCase
let memoryUserRepository: MemoryUserRepository
let fakeHashProvider: FakeHashProvider
describe('AuthenticateUser', () => {
    beforeEach(() => {
        memoryUserRepository = new MemoryUserRepository()
        fakeHashProvider = new FakeHashProvider()

        authenticateUserUseCase = new AuthenticateUserUseCase(memoryUserRepository, fakeHashProvider);
    });

    it('should be able to authenticate', async () => {
        await memoryUserRepository.create({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        });

        const response = await authenticateUserUseCase.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });

    it('should not be able to authenticate with wrong password', async () => {
        await memoryUserRepository.create({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        });

        await expect(
            authenticateUserUseCase.execute({
                email: 'johndoe@example.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
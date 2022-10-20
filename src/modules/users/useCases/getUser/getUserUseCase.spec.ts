import "reflect-metadata"
import 'dotenv/config';
import {describe} from "@jest/globals";
import MemoryUserRepository from "../../infra/memory/MemoryUserRepository";
import AppError from "../../../../errors/AppError";
import FakeHashProvider from "../../providers/HashProvider/fakes/FakeHashProvider";
import GetUserUseCase from "./getUserUseCase";

let getUserUseCase: GetUserUseCase
let memoryUserRepository: MemoryUserRepository
let fakeHashProvider: FakeHashProvider
describe('GetUser', () => {
    beforeEach(() => {
        memoryUserRepository = new MemoryUserRepository()
        fakeHashProvider = new FakeHashProvider()

        getUserUseCase = new GetUserUseCase(memoryUserRepository)
    });

    it('should be able to recover a user profile', async () => {
        const user = await memoryUserRepository.create({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: "Doe"
        });

        const updatedUser = await getUserUseCase.execute(user.id);

        expect(updatedUser.first_name).toBe('John');
        expect(updatedUser.last_name).toBe('Doe');
        expect(updatedUser.email).toBe('johndoe@example.com');
    });

    it('should not be able to recover a non-existing user profile', async () => {
        await expect(getUserUseCase.execute('non-existent-user')).rejects
            .toBeInstanceOf(AppError);
    });
});
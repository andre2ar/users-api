import "reflect-metadata"
import 'dotenv/config';
import {describe} from "@jest/globals";
import MemoryUserRepository from "../../infra/memory/MemoryUserRepository";
import AppError from "../../../../errors/AppError";
import UpdateUserUseCase from "./updateUserUseCase";

let updateUserUseCase: UpdateUserUseCase
let memoryUserRepository: MemoryUserRepository
describe('UpdateUser', () => {
    beforeEach(() => {
        memoryUserRepository = new MemoryUserRepository()

        updateUserUseCase = new UpdateUserUseCase(memoryUserRepository)
    });

    it('should be able to update the profile', async () => {
        const user = await memoryUserRepository.create({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        });

        const updatedUser = await updateUserUseCase.execute(user.id,{
            first_name: 'André',
            last_name: "Ribeiro",
            email: 'andremail@test.com',
        });

        expect(updatedUser.first_name).toBe('André');
        expect(updatedUser.last_name).toBe('Ribeiro');
        expect(updatedUser.email).toBe('andremail@test.com');
    });

    it('should not be able to update email to an already used email', async () => {
        await memoryUserRepository.create({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        });

        const user2 = await memoryUserRepository.create({
            first_name: 'André',
            last_name: "Ribeiro",
            email: 'andremail@test.com',
            password: '123456',
        });

        await expect(updateUserUseCase.execute(user2.id,{
            first_name: 'André',
            last_name: "Ribeiro",
            email: 'johndoe@example.com',
        })).rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to update a non-existing user profile', async () => {
        await expect(updateUserUseCase.execute('no-existent-user', {
            first_name: 'André',
            last_name: "Ribeiro",
            email: 'andremail@test.com',
        })).rejects.toBeInstanceOf(AppError);
    });
});
import "reflect-metadata"
import 'dotenv/config';
import {describe} from "@jest/globals";
import MemoryUserRepository from "../../infra/memory/MemoryUserRepository";
import AppError from "../../../../errors/AppError";
import DeleteUserUseCase from "./deleteUserUseCase";

let deleteUserUseCase: DeleteUserUseCase
let memoryUserRepository: MemoryUserRepository
describe('UpdateUser', () => {
    beforeEach(() => {
        memoryUserRepository = new MemoryUserRepository()

        deleteUserUseCase = new DeleteUserUseCase(memoryUserRepository)
    });

    it('should be able to delete a user', async () => {
        const loggedUser = await memoryUserRepository.create({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        });

        const user = await memoryUserRepository.create({
            email: 'tobedeleted@example.com',
            password: '123456',
            first_name: 'To Be Deleted',
            last_name: " User"
        });

        await deleteUserUseCase.execute(user.id, loggedUser.id);
        const deletedUser = await memoryUserRepository.findById(user.id)

        expect(deletedUser).toBe(undefined)
    });

    it('should not be able to delete a unexistent user', async () => {
        const loggedUser = await memoryUserRepository.create({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        });

        await expect(deleteUserUseCase.execute('wrong-id', loggedUser.id))
            .rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to delete your own user', async () => {
        const loggedUser = await memoryUserRepository.create({
            email: 'johndoe@example.com',
            password: '123456',
            first_name: 'John',
            last_name: " Doe"
        });

        await expect(deleteUserUseCase.execute(loggedUser.id, loggedUser.id))
            .rejects.toBeInstanceOf(AppError)
    });
});
import UserDTO from "../../modules/users/dtos/UserDTO";

export {};

declare global {
    namespace Express {
        interface Request {
            user: UserDTO
        }
    }
}
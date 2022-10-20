import {Router} from "express";
import CreateUserController from "../../../modules/users/useCases/createUser/createUserController";
import {ensureAuthenticated} from "../middlewares/ensureAuthenticated";
import GetUserController from "../../../modules/users/useCases/getUser/getUserController";
import UpdateUserController from "../../../modules/users/useCases/updateUser/updateUserController";
import DeleteUserController from "../../../modules/users/useCases/deleteUser/deleteUserController";

const createUserController = new CreateUserController();
const getUserController = new GetUserController()
const updatedUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

const usersRouter = Router();

usersRouter.post("/", createUserController.handle);

usersRouter.use(ensureAuthenticated)

usersRouter.get("/:id", getUserController.handle);
usersRouter.put("/:id", updatedUserController.handle);
usersRouter.delete("/:id", deleteUserController.handle);

export default usersRouter;
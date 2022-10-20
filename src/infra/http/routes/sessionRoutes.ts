import {Router} from "express";
import {AuthenticateUserController} from "../../../modules/users/useCases/authenticateUser/authenticateUserController";

const sessionRouter = Router();

const authenticateUserController = new AuthenticateUserController();

sessionRouter.post("/", authenticateUserController.handle);

export default sessionRouter;
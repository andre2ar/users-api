import {Router} from "express";
import usersRouter from "./usersRoutes";
import sessionRouter from "./sessionRoutes";

const router = Router();

router.use('/users', usersRouter);
router.use('/session', sessionRouter);

export default router;
import express from 'express'
import "express-async-errors"
import 'dotenv/config';

import "../../container";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express()

app.use(express.json())

app.use(router)

app.use(globalErrorHandler);

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on port ${process.env.SERVER_PORT}`))
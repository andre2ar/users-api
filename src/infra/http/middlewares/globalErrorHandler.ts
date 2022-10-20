import {NextFunction, Request, Response} from "express";
import AppError from "../../../errors/AppError";

const globalErrorHandler = (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    console.log(err.message)

    return response.status(500).json({
        message: "Internal server error"
    })
}

export default globalErrorHandler;
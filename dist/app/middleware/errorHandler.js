"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.log("Error", error);
    let statusCode = 500;
    let message = "Something went wrong";
    if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Validation Failed";
    }
    else if (error.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${error.path}:${error.value}`;
    }
    else if (error.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }
    ;
    res.status(statusCode).json({
        message,
        success: false,
        error: error
    });
};
exports.errorHandler = errorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const client_1 = require("@prisma/client");
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    if (err instanceof errors_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            return res.status(400).json({
                success: false,
                message: "Unique constraint violation",
            });
        }
        if (err.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Record not found",
            });
        }
    }
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};
exports.errorHandler = errorHandler;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const errors_1 = require("../utils/errors");
const prisma_1 = __importDefault(require("../prisma"));
class UserService {
    async createUser(data) {
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new errors_1.AppError("User with this email already exists", 400);
        }
        return await prisma_1.default.user.create({ data });
    }
    async getAllUsers() {
        return await prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
            },
        });
    }
    async getUserById(id) {
        const user = await prisma_1.default.user.findUnique({
            where: { id },
            include: {
                groupMembers: {
                    include: {
                        group: true,
                    },
                },
            },
        });
        if (!user) {
            throw new errors_1.AppError("User not found", 404);
        }
        return user;
    }
    async updateUser(id, data) {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new errors_1.AppError("User not found", 404);
        }
        if (data.email && data.email !== user.email) {
            const existingUser = await prisma_1.default.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new errors_1.AppError("Email already in use", 400);
            }
        }
        return await prisma_1.default.user.update({
            where: { id },
            data,
        });
    }
    async deleteUser(id) {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new errors_1.AppError("User not found", 404);
        }
        await prisma_1.default.user.delete({ where: { id } });
    }
}
exports.UserService = UserService;

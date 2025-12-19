"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementService = void 0;
const client_1 = require("@prisma/client");
const errors_1 = require("../utils/errors");
const prisma_1 = __importDefault(require("../prisma"));
class SettlementService {
    async createSettlement(data) {
        const { groupId, fromUser, toUser, amount } = data;
        // Validate group exists
        const group = await prisma_1.default.group.findUnique({
            where: { id: groupId },
            include: { members: true },
        });
        if (!group) {
            throw new errors_1.AppError("Group not found", 404);
        }
        // Validate both users are members
        const memberIds = group.members.map((m) => m.userId);
        if (!memberIds.includes(fromUser) || !memberIds.includes(toUser)) {
            throw new errors_1.AppError("Both users must be members of the group", 400);
        }
        // Validate amount
        if (amount <= 0) {
            throw new errors_1.AppError("Settlement amount must be positive", 400);
        }
        // Validate users exist
        const [fromUserData, toUserData] = await Promise.all([
            prisma_1.default.user.findUnique({ where: { id: fromUser } }),
            prisma_1.default.user.findUnique({ where: { id: toUser } }),
        ]);
        if (!fromUserData || !toUserData) {
            throw new errors_1.AppError("One or both users not found", 404);
        }
        // Create settlement
        const settlement = await prisma_1.default.settlement.create({
            data: {
                groupId,
                fromUser,
                toUser,
                amount: new client_1.Prisma.Decimal(amount),
            },
            include: {
                from: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                to: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return settlement;
    }
    async getGroupSettlements(groupId) {
        const group = await prisma_1.default.group.findUnique({ where: { id: groupId } });
        if (!group) {
            throw new errors_1.AppError("Group not found", 404);
        }
        return await prisma_1.default.settlement.findMany({
            where: { groupId },
            include: {
                from: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                to: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}
exports.SettlementService = SettlementService;

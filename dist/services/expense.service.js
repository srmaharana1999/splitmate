"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const client_1 = require("@prisma/client");
const errors_1 = require("../utils/errors");
const prisma_1 = __importDefault(require("../prisma"));
class ExpenseService {
    async createExpense(data) {
        const { groupId, paidBy, amount, description, splitType, splits } = data;
        // Validate group exists
        const group = await prisma_1.default.group.findUnique({
            where: { id: groupId },
            include: { members: true },
        });
        if (!group) {
            throw new errors_1.AppError("Group not found", 404);
        }
        // Validate payer is a member
        const payerIsMember = group.members.some((m) => m.userId === paidBy);
        if (!payerIsMember) {
            throw new errors_1.AppError("Payer must be a member of the group", 400);
        }
        // Validate all split users are members
        const memberIds = group.members.map((m) => m.userId);
        const allSplitsAreMembers = splits.every((s) => memberIds.includes(s.userId));
        if (!allSplitsAreMembers) {
            throw new errors_1.AppError("All split users must be members of the group", 400);
        }
        // Calculate split amounts based on type
        const calculatedSplits = this.calculateSplits(splitType, amount, splits);
        // Validate total
        const total = calculatedSplits.reduce((sum, s) => sum + s.amount, 0);
        if (Math.abs(total - amount) > 0.01) {
            throw new errors_1.AppError(`Split amounts (${total}) must equal total amount (${amount})`, 400);
        }
        // Create expense with splits
        const expense = await prisma_1.default.expense.create({
            data: {
                groupId,
                paidBy,
                amount: new client_1.Prisma.Decimal(amount),
                description,
                splitType,
                splits: {
                    create: calculatedSplits.map((s) => ({
                        userId: s.userId,
                        amount: new client_1.Prisma.Decimal(s.amount),
                        percentage: s.percentage ? new client_1.Prisma.Decimal(s.percentage) : null,
                    })),
                },
            },
            include: {
                payer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                splits: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        return expense;
    }
    calculateSplits(splitType, totalAmount, splits) {
        switch (splitType) {
            case "EQUAL": {
                const amountPerPerson = totalAmount / splits.length;
                return splits.map((s) => ({
                    userId: s.userId,
                    amount: Math.round(amountPerPerson * 100) / 100,
                }));
            }
            case "EXACT": {
                if (splits.some((s) => s.amount === undefined)) {
                    throw new errors_1.AppError("All splits must have amount for EXACT split type", 400);
                }
                return splits.map((s) => ({
                    userId: s.userId,
                    amount: s.amount,
                }));
            }
            case "PERCENTAGE": {
                if (splits.some((s) => s.percentage === undefined)) {
                    throw new errors_1.AppError("All splits must have percentage for PERCENTAGE split type", 400);
                }
                const totalPercentage = splits.reduce((sum, s) => sum + (s.percentage || 0), 0);
                if (Math.abs(totalPercentage - 100) > 0.01) {
                    throw new errors_1.AppError("Percentages must add up to 100", 400);
                }
                return splits.map((s) => ({
                    userId: s.userId,
                    amount: Math.round(((totalAmount * s.percentage) / 100) * 100) / 100,
                    percentage: s.percentage,
                }));
            }
            default:
                throw new errors_1.AppError("Invalid split type", 400);
        }
    }
    async getGroupExpenses(groupId) {
        const group = await prisma_1.default.group.findUnique({ where: { id: groupId } });
        if (!group) {
            throw new errors_1.AppError("Group not found", 404);
        }
        return await prisma_1.default.expense.findMany({
            where: { groupId },
            include: {
                payer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                splits: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async getExpenseById(id) {
        const expense = await prisma_1.default.expense.findUnique({
            where: { id },
            include: {
                payer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                splits: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        if (!expense) {
            throw new errors_1.AppError("Expense not found", 404);
        }
        return expense;
    }
    async deleteExpense(id) {
        const expense = await prisma_1.default.expense.findUnique({ where: { id } });
        if (!expense) {
            throw new errors_1.AppError("Expense not found", 404);
        }
        await prisma_1.default.expense.delete({ where: { id } });
    }
}
exports.ExpenseService = ExpenseService;

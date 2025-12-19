"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const errors_1 = require("../utils/errors");
const prisma_1 = __importDefault(require("../prisma"));
class GroupService {
    async createGroup(data) {
        const { members, ...groupData } = data;
        // Validate all users exist
        const users = await prisma_1.default.user.findMany({
            where: { id: { in: members } },
        });
        if (users.length !== members.length) {
            throw new errors_1.AppError("One or more users not found", 404);
        }
        // Create group with members
        const group = await prisma_1.default.group.create({
            data: {
                ...groupData,
                members: {
                    create: members.map((userId, index) => ({
                        userId,
                        role: index === 0 ? "admin" : "member",
                    })),
                },
            },
            include: {
                members: {
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
        return group;
    }
    async getAllGroups() {
        return await prisma_1.default.group.findMany({
            include: {
                members: {
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
    }
    async getGroupById(id) {
        const group = await prisma_1.default.group.findUnique({
            where: { id },
            include: {
                members: {
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
                expenses: {
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
                },
            },
        });
        if (!group) {
            throw new errors_1.AppError("Group not found", 404);
        }
        return group;
    }
    async addMember(groupId, userId, role = "member") {
        const group = await prisma_1.default.group.findUnique({ where: { id: groupId } });
        if (!group) {
            throw new errors_1.AppError("Group not found", 404);
        }
        const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new errors_1.AppError("User not found", 404);
        }
        const existingMember = await prisma_1.default.groupMember.findUnique({
            where: {
                userId_groupId: {
                    userId,
                    groupId,
                },
            },
        });
        if (existingMember) {
            throw new errors_1.AppError("User is already a member of this group", 400);
        }
        return await prisma_1.default.groupMember.create({
            data: {
                userId,
                groupId,
                role,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async removeMember(groupId, userId) {
        const member = await prisma_1.default.groupMember.findUnique({
            where: {
                userId_groupId: {
                    userId,
                    groupId,
                },
            },
        });
        if (!member) {
            throw new errors_1.AppError("Member not found in this group", 404);
        }
        await prisma_1.default.groupMember.delete({
            where: {
                userId_groupId: {
                    userId,
                    groupId,
                },
            },
        });
    }
}
exports.GroupService = GroupService;

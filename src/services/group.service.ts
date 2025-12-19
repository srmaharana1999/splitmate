import { AppError } from "../utils/errors";
import prisma from "../prisma";

export class GroupService {
  async createGroup(data: {
    name: string;
    description?: string;
    members: string[];
  }) {
    const { members, ...groupData } = data;

    // Validate all users exist
    const users = await prisma.user.findMany({
      where: { id: { in: members } },
    });

    if (users.length !== members.length) {
      throw new AppError("One or more users not found", 404);
    }

    // Create group with members
    const group = await prisma.group.create({
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
    return await prisma.group.findMany({
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

  async getGroupById(id: string) {
    const group = await prisma.group.findUnique({
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
      throw new AppError("Group not found", 404);
    }

    return group;
  }

  async addMember(groupId: string, userId: string, role: string = "member") {
    const group = await prisma.group.findUnique({ where: { id: groupId } });
    if (!group) {
      throw new AppError("Group not found", 404);
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const existingMember = await prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

    if (existingMember) {
      throw new AppError("User is already a member of this group", 400);
    }

    return await prisma.groupMember.create({
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

  async removeMember(groupId: string, userId: string) {
    const member = await prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

    if (!member) {
      throw new AppError("Member not found in this group", 404);
    }

    await prisma.groupMember.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  }
}

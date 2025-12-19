import { Prisma } from "@prisma/client";
import { AppError } from "../utils/errors";
import prisma from "../prisma";

interface CreateSettlementData {
  groupId: string;
  fromUser: string;
  toUser: string;
  amount: number;
}

export class SettlementService {
  async createSettlement(data: CreateSettlementData) {
    const { groupId, fromUser, toUser, amount } = data;

    // Validate group exists
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!group) {
      throw new AppError("Group not found", 404);
    }

    // Validate both users are members
    const memberIds = group.members.map((m) => m.userId);
    if (!memberIds.includes(fromUser) || !memberIds.includes(toUser)) {
      throw new AppError("Both users must be members of the group", 400);
    }

    // Validate amount
    if (amount <= 0) {
      throw new AppError("Settlement amount must be positive", 400);
    }

    // Validate users exist
    const [fromUserData, toUserData] = await Promise.all([
      prisma.user.findUnique({ where: { id: fromUser } }),
      prisma.user.findUnique({ where: { id: toUser } }),
    ]);

    if (!fromUserData || !toUserData) {
      throw new AppError("One or both users not found", 404);
    }

    // Create settlement
    const settlement = await prisma.settlement.create({
      data: {
        groupId,
        fromUser,
        toUser,
        amount: new Prisma.Decimal(amount),
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

  async getGroupSettlements(groupId: string) {
    const group = await prisma.group.findUnique({ where: { id: groupId } });

    if (!group) {
      throw new AppError("Group not found", 404);
    }

    return await prisma.settlement.findMany({
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

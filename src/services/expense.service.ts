import { GroupMember, Prisma, User } from "@prisma/client";
import { AppError } from "../utils/errors";
import prisma from "../prisma";

interface SplitDetail {
  userId: string;
  amount: number;
  percentage?: number;
}

interface CreateExpenseData {
  groupId: string;
  paidBy: string;
  amount: number;
  description: string;
  splitType: "EQUAL" | "EXACT" | "PERCENTAGE";
  splits: SplitDetail[];
}

export class ExpenseService {
  async createExpense(data: CreateExpenseData) {
    const { groupId, paidBy, amount, description, splitType, splits } = data;

    // Validate group exists
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!group) {
      throw new AppError("Group not found", 404);
    }

    // Validate payer is a member
    const payerIsMember = group.members.some(
      (m: GroupMember) => m.userId === paidBy
    );
    if (!payerIsMember) {
      throw new AppError("Payer must be a member of the group", 400);
    }

    // Validate all split users are members
    const memberIds = group.members.map((m: GroupMember) => m.userId);
    const allSplitsAreMembers = splits.every((s: SplitDetail) =>
      memberIds.includes(s.userId)
    );
    if (!allSplitsAreMembers) {
      throw new AppError("All split users must be members of the group", 400);
    }

    // Calculate split amounts based on type
    const calculatedSplits = this.calculateSplits(splitType, amount, splits);

    // Validate total
    const total = calculatedSplits.reduce(
      (sum: number, s: SplitDetail) => sum + s.amount,
      0
    );
    if (Math.abs(total - amount) > 0.01) {
      throw new AppError(
        `Split amounts (${total}) must equal total amount (${amount})`,
        400
      );
    }

    // Create expense with splits
    const expense = await prisma.expense.create({
      data: {
        groupId,
        paidBy,
        amount: new Prisma.Decimal(amount),
        description,
        splitType,
        splits: {
          create: calculatedSplits.map((s: SplitDetail) => ({
            userId: s.userId,
            amount: new Prisma.Decimal(s.amount),
            percentage: s.percentage ? new Prisma.Decimal(s.percentage) : null,
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

  private calculateSplits(
    splitType: string,
    totalAmount: number,
    splits: SplitDetail[]
  ): SplitDetail[] {
    switch (splitType) {
      case "EQUAL": {
        const amountPerPerson = totalAmount / splits.length;
        return splits.map((s: SplitDetail) => ({
          userId: s.userId,
          amount: Math.round(amountPerPerson * 100) / 100,
        }));
      }

      case "EXACT": {
        if (splits.some((s: SplitDetail) => s.amount === undefined)) {
          throw new AppError(
            "All splits must have amount for EXACT split type",
            400
          );
        }
        return splits.map((s: SplitDetail) => ({
          userId: s.userId,
          amount: s.amount!,
        }));
      }

      case "PERCENTAGE": {
        if (splits.some((s: SplitDetail) => s.percentage === undefined)) {
          throw new AppError(
            "All splits must have percentage for PERCENTAGE split type",
            400
          );
        }
        const totalPercentage = splits.reduce(
          (sum: number, s: SplitDetail) => sum + (s.percentage || 0),
          0
        );
        if (Math.abs(totalPercentage - 100) > 0.01) {
          throw new AppError("Percentages must add up to 100", 400);
        }
        return splits.map((s: SplitDetail) => ({
          userId: s.userId,
          amount: Math.round(((totalAmount * s.percentage!) / 100) * 100) / 100,
          percentage: s.percentage,
        }));
      }

      default:
        throw new AppError("Invalid split type", 400);
    }
  }

  async getGroupExpenses(groupId: string) {
    const group = await prisma.group.findUnique({ where: { id: groupId } });
    if (!group) {
      throw new AppError("Group not found", 404);
    }

    return await prisma.expense.findMany({
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

  async getExpenseById(id: string) {
    const expense = await prisma.expense.findUnique({
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
      throw new AppError("Expense not found", 404);
    }

    return expense;
  }

  async deleteExpense(id: string) {
    const expense = await prisma.expense.findUnique({ where: { id } });

    if (!expense) {
      throw new AppError("Expense not found", 404);
    }

    await prisma.expense.delete({ where: { id } });
  }
}

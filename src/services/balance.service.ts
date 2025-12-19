import prisma from "../prisma";
import { AppError } from "../utils/errors";

interface Balance {
  userId: string;
  userName: string;
  amount: number;
}

interface SimplifiedBalance {
  from: string;
  to: string;
  amount: number;
}

export class BalanceService {
  async getUserBalances(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        groupMembers: {
          include: {
            group: true,
          },
        },
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const groupIds = user.groupMembers.map((gm) => gm.groupId);
    const balances = [];

    for (const groupId of groupIds) {
      const groupBalance = await this.getUserGroupBalance(userId, groupId);
      balances.push(groupBalance);
    }

    return {
      userId,
      userName: user.name,
      balances,
    };
  }

  async getGroupBalances(groupId: string) {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!group) {
      throw new AppError("Group not found", 404);
    }

    const balanceMap = await this.calculateGroupBalances(groupId);
    const simplifiedBalances = this.simplifyBalances(balanceMap);

    return {
      groupId,
      groupName: group.name,
      balances: simplifiedBalances,
    };
  }

  async getUserGroupBalance(userId: string, groupId: string) {
    const member = await prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

    if (!member) {
      throw new AppError("User is not a member of this group", 404);
    }

    const balanceMap = await this.calculateGroupBalances(groupId);

    const owes: Balance[] = [];
    const owedBy: Balance[] = [];

    for (const [key, amount] of Object.entries(balanceMap)) {
      const [from, to] = key.split("->");

      if (from === userId && amount > 0) {
        const toUser = await prisma.user.findUnique({ where: { id: to } });
        owes.push({
          userId: to,
          userName: toUser?.name || "Unknown",
          amount: Math.round(amount * 100) / 100,
        });
      } else if (to === userId && amount > 0) {
        const fromUser = await prisma.user.findUnique({ where: { id: from } });
        owedBy.push({
          userId: from,
          userName: fromUser?.name || "Unknown",
          amount: Math.round(amount * 100) / 100,
        });
      }
    }

    const totalOwes = owes.reduce((sum, b) => sum + b.amount, 0);
    const totalOwedBy = owedBy.reduce((sum, b) => sum + b.amount, 0);

    return {
      groupId,
      userId,
      owes,
      owedBy,
      totalOwes: Math.round(totalOwes * 100) / 100,
      totalOwedBy: Math.round(totalOwedBy * 100) / 100,
      netBalance: Math.round((totalOwedBy - totalOwes) * 100) / 100,
    };
  }

  private async calculateGroupBalances(
    groupId: string
  ): Promise<Record<string, number>> {
    const expenses = await prisma.expense.findMany({
      where: { groupId },
      include: {
        splits: true,
      },
    });

    const settlements = await prisma.settlement.findMany({
      where: { groupId },
    });

    const balanceMap: Record<string, number> = {};

    // Process expenses
    for (const expense of expenses) {
      const paidBy = expense.paidBy;
      const totalAmount = Number(expense.amount);

      for (const split of expense.splits) {
        const userId = split.userId;
        const splitAmount = Number(split.amount);

        if (userId !== paidBy) {
          const key = `${userId}->${paidBy}`;
          balanceMap[key] = (balanceMap[key] || 0) + splitAmount;
        }
      }
    }

    // Process settlements
    for (const settlement of settlements) {
      const key = `${settlement.fromUser}->${settlement.toUser}`;
      const amount = Number(settlement.amount);
      balanceMap[key] = (balanceMap[key] || 0) - amount;
    }

    // Clean up zero or negative balances
    for (const key in balanceMap) {
      if (balanceMap[key] <= 0) {
        delete balanceMap[key];
      }
    }

    return balanceMap;
  }

  private simplifyBalances(
    balanceMap: Record<string, number>
  ): SimplifiedBalance[] {
    const netBalances: Record<string, number> = {};

    // Calculate net balances for each user
    for (const [key, amount] of Object.entries(balanceMap)) {
      const [from, to] = key.split("->");
      netBalances[from] = (netBalances[from] || 0) - amount;
      netBalances[to] = (netBalances[to] || 0) + amount;
    }

    const creditors: Array<{ userId: string; amount: number }> = [];
    const debtors: Array<{ userId: string; amount: number }> = [];

    for (const [userId, balance] of Object.entries(netBalances)) {
      if (balance > 0.01) {
        creditors.push({ userId, amount: balance });
      } else if (balance < -0.01) {
        debtors.push({ userId, amount: -balance });
      }
    }

    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    const result: SimplifiedBalance[] = [];
    let i = 0,
      j = 0;

    while (i < creditors.length && j < debtors.length) {
      const creditor = creditors[i];
      const debtor = debtors[j];
      const amount = Math.min(creditor.amount, debtor.amount);

      result.push({
        from: debtor.userId,
        to: creditor.userId,
        amount: Math.round(amount * 100) / 100,
      });

      creditor.amount -= amount;
      debtor.amount -= amount;

      if (creditor.amount < 0.01) i++;
      if (debtor.amount < 0.01) j++;
    }

    return result;
  }
}

import { Request, Response, NextFunction } from "express";
import { BalanceService } from "../services/balance.service";

const balanceService = new BalanceService();

export class BalanceController {
  getUserBalances = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const balances = await balanceService.getUserBalances(req.params.userId);
      res.json({ success: true, data: balances });
    } catch (error) {
      next(error);
    }
  };

  getGroupBalances = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const balances = await balanceService.getGroupBalances(
        req.params.groupId
      );
      res.json({ success: true, data: balances });
    } catch (error) {
      next(error);
    }
  };

  getUserGroupBalance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const balance = await balanceService.getUserGroupBalance(
        req.params.userId,
        req.params.groupId
      );
      res.json({ success: true, data: balance });
    } catch (error) {
      next(error);
    }
  };
}

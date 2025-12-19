import { Request, Response, NextFunction } from "express";
import { SettlementService } from "../services/settlement.service";

const settlementService = new SettlementService();

export class SettlementController {
  createSettlement = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const settlement = await settlementService.createSettlement(req.body);
      res.status(201).json({ success: true, data: settlement });
    } catch (error) {
      next(error);
    }
  };

  getGroupSettlements = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const settlements = await settlementService.getGroupSettlements(
        req.params.groupId
      );
      res.json({ success: true, data: settlements });
    } catch (error) {
      next(error);
    }
  };
}

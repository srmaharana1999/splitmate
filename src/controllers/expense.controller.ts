import { Request, Response, NextFunction } from "express";
import { ExpenseService } from "../services/expense.service";

const expenseService = new ExpenseService();

export class ExpenseController {
  createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expense = await expenseService.createExpense(req.body);
      res.status(201).json({ success: true, data: expense });
    } catch (error) {
      next(error);
    }
  };

  getGroupExpenses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const expenses = await expenseService.getGroupExpenses(
        req.params.groupId
      );
      res.json({ success: true, data: expenses });
    } catch (error) {
      next(error);
    }
  };

  getExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expense = await expenseService.getExpenseById(req.params.id);
      res.json({ success: true, data: expense });
    } catch (error) {
      next(error);
    }
  };

  deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await expenseService.deleteExpense(req.params.id);
      res.json({ success: true, message: "Expense deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

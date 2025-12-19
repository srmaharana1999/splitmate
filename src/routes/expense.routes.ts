import { Router } from "express";
import { ExpenseController } from "../controllers/expense.controller";

const router = Router();
const controller = new ExpenseController();

router.post("/", controller.createExpense);
router.get("/group/:groupId", controller.getGroupExpenses);
router.get("/:id", controller.getExpenseById);
router.delete("/:id", controller.deleteExpense);

export default router;

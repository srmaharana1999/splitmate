"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const expense_service_1 = require("../services/expense.service");
const expenseService = new expense_service_1.ExpenseService();
class ExpenseController {
    constructor() {
        this.createExpense = async (req, res, next) => {
            try {
                const expense = await expenseService.createExpense(req.body);
                res.status(201).json({ success: true, data: expense });
            }
            catch (error) {
                next(error);
            }
        };
        this.getGroupExpenses = async (req, res, next) => {
            try {
                const expenses = await expenseService.getGroupExpenses(req.params.groupId);
                res.json({ success: true, data: expenses });
            }
            catch (error) {
                next(error);
            }
        };
        this.getExpenseById = async (req, res, next) => {
            try {
                const expense = await expenseService.getExpenseById(req.params.id);
                res.json({ success: true, data: expense });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteExpense = async (req, res, next) => {
            try {
                await expenseService.deleteExpense(req.params.id);
                res.json({ success: true, message: "Expense deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ExpenseController = ExpenseController;

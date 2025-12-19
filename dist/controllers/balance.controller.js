"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceController = void 0;
const balance_service_1 = require("../services/balance.service");
const balanceService = new balance_service_1.BalanceService();
class BalanceController {
    constructor() {
        this.getUserBalances = async (req, res, next) => {
            try {
                const balances = await balanceService.getUserBalances(req.params.userId);
                res.json({ success: true, data: balances });
            }
            catch (error) {
                next(error);
            }
        };
        this.getGroupBalances = async (req, res, next) => {
            try {
                const balances = await balanceService.getGroupBalances(req.params.groupId);
                res.json({ success: true, data: balances });
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserGroupBalance = async (req, res, next) => {
            try {
                const balance = await balanceService.getUserGroupBalance(req.params.userId, req.params.groupId);
                res.json({ success: true, data: balance });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.BalanceController = BalanceController;

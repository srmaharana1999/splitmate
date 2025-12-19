"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementController = void 0;
const settlement_service_1 = require("../services/settlement.service");
const settlementService = new settlement_service_1.SettlementService();
class SettlementController {
    constructor() {
        this.createSettlement = async (req, res, next) => {
            try {
                const settlement = await settlementService.createSettlement(req.body);
                res.status(201).json({ success: true, data: settlement });
            }
            catch (error) {
                next(error);
            }
        };
        this.getGroupSettlements = async (req, res, next) => {
            try {
                const settlements = await settlementService.getGroupSettlements(req.params.groupId);
                res.json({ success: true, data: settlements });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.SettlementController = SettlementController;

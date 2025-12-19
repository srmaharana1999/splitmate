"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settlement_controller_1 = require("../controllers/settlement.controller");
const router = (0, express_1.Router)();
const controller = new settlement_controller_1.SettlementController();
router.post("/", controller.createSettlement);
router.get("/group/:groupId", controller.getGroupSettlements);
exports.default = router;

import { Router } from "express";
import { SettlementController } from "../controllers/settlement.controller";

const router = Router();
const controller = new SettlementController();

router.post("/", controller.createSettlement);
router.get("/group/:groupId", controller.getGroupSettlements);

export default router;

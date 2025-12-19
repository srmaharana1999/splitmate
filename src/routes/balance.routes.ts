import { Router } from "express";
import { BalanceController } from "../controllers/balance.controller";

const router = Router();
const controller = new BalanceController();

router.get("/user/:userId", controller.getUserBalances);
router.get("/group/:groupId", controller.getGroupBalances);
router.get("/user/:userId/group/:groupId", controller.getUserGroupBalance);

export default router;

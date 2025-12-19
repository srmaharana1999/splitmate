import { Router } from "express";
import { GroupController } from "../controllers/group.controller";

const router = Router();
const controller = new GroupController();

router.post("/", controller.createGroup);
router.get("/", controller.getAllGroups);
router.get("/:id", controller.getGroupById);
router.post("/:id/members", controller.addMember);
router.delete("/:id/members/:userId", controller.removeMember);

export default router;

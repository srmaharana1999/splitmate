import { Request, Response, NextFunction } from "express";
import { GroupService } from "../services/group.service";

const groupService = new GroupService();

export class GroupController {
  createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await groupService.createGroup(req.body);
      res.status(201).json({ success: true, data: group });
    } catch (error) {
      next(error);
    }
  };

  getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await groupService.getAllGroups();
      res.json({ success: true, data: groups });
    } catch (error) {
      next(error);
    }
  };

  getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await groupService.getGroupById(req.params.id);
      res.json({ success: true, data: group });
    } catch (error) {
      next(error);
    }
  };

  addMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await groupService.addMember(
        req.params.id,
        req.body.userId,
        req.body.role
      );
      res.status(201).json({ success: true, data: member });
    } catch (error) {
      next(error);
    }
  };

  removeMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await groupService.removeMember(req.params.id, req.params.userId);
      res.json({ success: true, message: "Member removed successfully" });
    } catch (error) {
      next(error);
    }
  };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const group_service_1 = require("../services/group.service");
const groupService = new group_service_1.GroupService();
class GroupController {
    constructor() {
        this.createGroup = async (req, res, next) => {
            try {
                const group = await groupService.createGroup(req.body);
                res.status(201).json({ success: true, data: group });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllGroups = async (req, res, next) => {
            try {
                const groups = await groupService.getAllGroups();
                res.json({ success: true, data: groups });
            }
            catch (error) {
                next(error);
            }
        };
        this.getGroupById = async (req, res, next) => {
            try {
                const group = await groupService.getGroupById(req.params.id);
                res.json({ success: true, data: group });
            }
            catch (error) {
                next(error);
            }
        };
        this.addMember = async (req, res, next) => {
            try {
                const member = await groupService.addMember(req.params.id, req.body.userId, req.body.role);
                res.status(201).json({ success: true, data: member });
            }
            catch (error) {
                next(error);
            }
        };
        this.removeMember = async (req, res, next) => {
            try {
                await groupService.removeMember(req.params.id, req.params.userId);
                res.json({ success: true, message: "Member removed successfully" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.GroupController = GroupController;

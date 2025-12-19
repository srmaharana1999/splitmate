"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
class UserController {
    constructor() {
        this.createUser = async (req, res, next) => {
            try {
                const user = await userService.createUser(req.body);
                res.status(201).json({ success: true, data: user });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllUsers = async (req, res, next) => {
            try {
                const users = await userService.getAllUsers();
                res.json({ success: true, data: users });
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                const user = await userService.getUserById(req.params.id);
                res.json({ success: true, data: user });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            try {
                const user = await userService.updateUser(req.params.id, req.body);
                res.json({ success: true, data: user });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                await userService.deleteUser(req.params.id);
                res.json({ success: true, message: "User deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.UserController = UserController;

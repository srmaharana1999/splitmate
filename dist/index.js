"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const group_routes_1 = __importDefault(require("./routes/group.routes"));
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const balance_routes_1 = __importDefault(require("./routes/balance.routes"));
const settlement_routes_1 = __importDefault(require("./routes/settlement.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/users", user_routes_1.default);
app.use("/api/groups", group_routes_1.default);
app.use("/api/expenses", expense_routes_1.default);
app.use("/api/balances", balance_routes_1.default);
app.use("/api/settlements", settlement_routes_1.default);
// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Expense Sharing API is running" });
});
// Error handling middleware
app.use(error_middleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

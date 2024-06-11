"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userValidator_1 = require("../middleware/validator/userValidator");
const validateRequest_1 = require("../middleware/validateRequest");
const userRouter = express_1.default.Router();
userRouter.post("/register", (0, validateRequest_1.validateRequest)(userValidator_1.userSchema), userController_1.userController.register); //Route for userRegistration
exports.default = userRouter;

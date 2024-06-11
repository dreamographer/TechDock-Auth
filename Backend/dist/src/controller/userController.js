"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../database/models/userModel");
exports.userController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            // Check if user already exists
            const existingUser = yield userModel_1.User.findOne({
                $or: [{ username }, { email }],
            });
            console.log("existing user", existingUser);
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Username or email already exists" });
            }
            // Hash the password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Create new user
            const user = new userModel_1.User({
                username,
                email,
                password: hashedPassword,
            });
            yield user.save();
            res.status(201).json({ message: "User registered successfully" });
        }
        catch (error) {
            console.log("error at register", error);
            res.status(500).json({ message: "Server error" });
        }
    }),
};

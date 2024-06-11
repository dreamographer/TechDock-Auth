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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const userModel_1 = require("../src/database/models/userModel");
const app = (0, app_1.default)();
// Mock the User model
jest.mock("../src/database/models/userModel");
describe("User Registration", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    describe("Given User data are valid", () => {
        it("should register a new user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock User.findOne to return null (no existing user)
            userModel_1.User.findOne.mockResolvedValue(null);
            const response = yield (0, supertest_1.default)(app).post("/api/users/register").send({
                username: "testuser",
                email: "testuser@gmail.com",
                password: "Password12",
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("User registered successfully");
            expect(userModel_1.User.findOne).toHaveBeenCalledTimes(1);
        }));
    });
    describe("Given username or email already exists", () => {
        it("should return error", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock User.findOne to return an existing user
            userModel_1.User.findOne.mockResolvedValue({});
            const response = yield (0, supertest_1.default)(app).post("/api/users/register").send({
                username: "testuser",
                email: "testuser@example.com",
                password: "Password123!",
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Username or email already exists");
            expect(userModel_1.User.findOne).toHaveBeenCalledTimes(1);
        }));
    });
    describe("Given an error occurs on the server", () => {
        it("should return error if server error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock User.findOne to throw an error
            userModel_1.User.findOne.mockImplementation(() => {
                throw new Error("Server error");
            });
            const response = yield (0, supertest_1.default)(app).post("/api/users/register").send({
                username: "testuser",
                email: "testuser@example.com",
                password: "Password123",
            });
            expect(response.status).toBe(500);
            expect(response.body.message).toBe("Server error");
            expect(userModel_1.User.findOne).toHaveBeenCalledTimes(1);
        }));
    });
});

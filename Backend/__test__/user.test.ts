import supertest from "supertest";
import createServer from "../src/app";
import { User } from "../src/database/models/userModel";
const app = createServer();

// Mock the User model
jest.mock("../src/database/models/userModel");

describe("User Registration", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("Given User data are valid", () => {
    it("should register a new user successfully", async () => {
      // Mock User.findOne to return null (no existing user)
      (User.findOne as jest.Mock).mockResolvedValue(null);
      const response = await supertest(app).post("/api/users/register").send({
        username: "testuser",
        email: "testuser@gmail.com",
        password: "Password12",
      });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User registered successfully");
      expect(User.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe("Given username or email already exists", () => {
    it("should return error", async () => {
      // Mock User.findOne to return an existing user
      (User.findOne as jest.Mock).mockResolvedValue({});

      const response = await supertest(app).post("/api/users/register").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "Password123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Username or email already exists");
      expect(User.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("Given an error occurs on the server", () => {
    it("should return error if server error occurs", async () => {
      // Mock User.findOne to throw an error
      (User.findOne as jest.Mock).mockImplementation(() => {
        throw new Error("Server error");
      });

      const response = await supertest(app).post("/api/users/register").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "Password123",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Server error");
      expect(User.findOne).toHaveBeenCalledTimes(1);
    });
  });
});

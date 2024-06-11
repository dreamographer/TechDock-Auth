"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(5, "Full name must have at least 5 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must have at least 8 characters with alphanumber combination")
        .refine((password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/.test(password), //regex Validation for password
    {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number.",
    }),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(422).json({ error: error.errors });
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
exports.validateRequest = validateRequest;

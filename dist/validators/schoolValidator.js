"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolValidator = void 0;
const zod_1 = __importDefault(require("zod"));
// Define the schema for the school object
exports.schoolValidator = zod_1.default.object({
    name: zod_1.default.string().min(3).max(255),
    address: zod_1.default.string().min(3),
    latitude: zod_1.default.number().min(-90).max(90),
    longitude: zod_1.default.number().min(-180).max(180),
});

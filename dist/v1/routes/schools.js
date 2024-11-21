"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const school_controller_1 = require("../controllers/school.controller");
const schoolRouter = express_1.default.Router();
// Define the routes for the school resource
schoolRouter.post('/add', school_controller_1.addSchools);
schoolRouter.get('/listSchools', school_controller_1.getSchools);
exports.default = schoolRouter;

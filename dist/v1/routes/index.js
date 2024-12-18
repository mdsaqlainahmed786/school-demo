"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const schools_1 = __importDefault(require("./schools"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Mount the school router on the /api/v1/schools route
app.use('/api/v1/schools', schools_1.default);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

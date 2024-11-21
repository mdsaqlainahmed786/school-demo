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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSchools = exports.getSchool = void 0;
const client_1 = require("@prisma/client");
const schoolValidator_1 = require("../../validators/schoolValidator");
const prisma = new client_1.PrismaClient();
function getSchool(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ message: 'Schools fetched successfully' });
        return;
    });
}
exports.getSchool = getSchool;
function addSchools(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bodyParser = schoolValidator_1.schoolValidator.safeParse(req.body);
            if (!bodyParser.success) {
                res.status(400).json({ message: bodyParser.error });
                return;
            }
            const { name, address, latitude, longitude } = bodyParser.data;
            const school = yield prisma.school.create({
                data: {
                    name,
                    address,
                    latitude,
                    longitude,
                },
            });
            res.status(201).json({ message: 'School added successfully', data: school });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.addSchools = addSchools;

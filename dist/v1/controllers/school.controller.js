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
exports.getSchools = exports.addSchools = void 0;
const client_1 = require("@prisma/client");
const schoolValidator_1 = require("../../validators/schoolValidator");
//generate a prisma client
const prisma = new client_1.PrismaClient();
function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Earth's radius in kilometers
    // Using haversine formula to calculate distance between two points
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}
function addSchools(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the request body
            const bodyParser = schoolValidator_1.schoolValidator.safeParse(req.body);
            if (!bodyParser.success) {
                res.status(400).json({ message: bodyParser.error });
                return;
            }
            const { name, address, latitude, longitude } = bodyParser.data;
            // Add the school to the database
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
function getSchools(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract user's latitude and longitude from query parameters
            const { latitude, longitude } = req.query;
            if (!latitude || !longitude) {
                res
                    .status(400)
                    .json({ error: 'Latitude and longitude are required' });
                return;
            }
            const userLat = parseFloat(latitude);
            const userLon = parseFloat(longitude);
            // Fetch all schools from the database
            const schools = yield prisma.school.findMany();
            // Add distance to each school and sort by proximity
            const schoolsWithDistance = schools.map((school) => {
                const distanceInKms = calculateDistance(userLat, userLon, school.latitude, school.longitude);
                return Object.assign(Object.assign({}, school), { distanceInKms });
            });
            const sortedSchools = schoolsWithDistance.sort((a, b) => a.distanceInKms - b.distanceInKms);
            // Return the sorted list
            res.json(sortedSchools);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getSchools = getSchools;

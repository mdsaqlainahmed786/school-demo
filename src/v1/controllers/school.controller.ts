import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { schoolValidator } from "../../validators/schoolValidator";

//generate a prisma client
const prisma = new PrismaClient();

function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    const R = 6371; // Earth's radius in kilometers


    // Using haversine formula to calculate distance between two points
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
}

export async function addSchools(req: Request, res: Response) {
    try {
        // Validate the request body
        const bodyParser = schoolValidator.safeParse(req.body);
        if (!bodyParser.success) {
            res.status(400).json({ message: bodyParser.error });
            return;
        }
        const { name, address, latitude, longitude } = bodyParser.data;
        // Add the school to the database
        const school = await prisma.school.create({
            data: {
                name,
                address,
                latitude,
                longitude,
            },
        });
        res.status(201).json({ message: 'School added successfully', data: school });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}



export async function getSchools(req: Request, res: Response) {
    try {
        // Extract user's latitude and longitude from query parameters
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            res
                .status(400)
                .json({ error: 'Latitude and longitude are required' });
            return
        }

        const userLat = parseFloat(latitude as string);
        const userLon = parseFloat(longitude as string);

        // Fetch all schools from the database
        const schools = await prisma.school.findMany();

        // Add distance to each school and sort by proximity
        const schoolsWithDistance = schools.map((school) => {
            const distanceInKms = calculateDistance(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            );
            return { ...school, distanceInKms };
        });

        const sortedSchools = schoolsWithDistance.sort(
            (a, b) => a.distanceInKms - b.distanceInKms
        );

        // Return the sorted list
        res.json(sortedSchools);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}










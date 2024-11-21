import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { schoolValidator } from "../../validators/schoolValidator";

const prisma = new PrismaClient();
export async function getSchool(req: Request, res: Response) {
    res.status(200).json({ message: 'Schools fetched successfully' });
    return;
}


export async function addSchools(req: Request, res: Response) {
    try {
        const bodyParser = schoolValidator.safeParse(req.body);
        if (!bodyParser.success) {
            res.status(400).json({ message: bodyParser.error });
            return;
        }
        const { name, address, latitude, longitude } = bodyParser.data;
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






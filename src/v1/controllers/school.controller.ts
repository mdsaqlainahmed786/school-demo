import { Request, Response } from "express";

async function getSchool(req: Request, res: Response) {
    res.status(200).json({ message: 'Schools fetched successfully' });
    return;
}

export { getSchool }




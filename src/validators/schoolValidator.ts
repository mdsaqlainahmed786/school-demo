import z from 'zod';

export const schoolValidator = z.object({
    name: z.string().min(3).max(255),
    address: z.string().min(3),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
});
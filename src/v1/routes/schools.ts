import express from 'express';
import { addSchools, getSchools  } from '../controllers/school.controller';
const schoolRouter = express.Router();

// Define the routes for the school resource
schoolRouter.post('/add', addSchools);

schoolRouter.get('/listSchools', getSchools);



export default schoolRouter
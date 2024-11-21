import express from 'express';
import { addSchools, getSchool,  } from '../controllers/school.controller';
const schoolRouter = express.Router();




schoolRouter.get('/get', getSchool);
schoolRouter.post('/add', addSchools);



export default schoolRouter
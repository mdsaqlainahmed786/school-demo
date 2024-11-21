import express from 'express';
import { getSchool } from '../controllers/school.controller';
const schoolRouter = express.Router();




schoolRouter.get('/get', getSchool);



export default schoolRouter
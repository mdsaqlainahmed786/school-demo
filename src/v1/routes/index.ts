import express from 'express';
import cors from 'cors';
import schoolRouter from './schools';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/schools', schoolRouter);




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
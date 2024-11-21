import express from 'express';
import cors from 'cors';
import schoolRouter from './schools';
const app = express();
const port = process.env.PORT || 5002;
app.use(cors());
app.use(express.json());
// Mount the school router on the /api/v1/schools route
app.use('/api/v1/schools', schoolRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
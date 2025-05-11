import express from 'express';
import {connectDb} from './config/db.js'
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import activitiesRoute from './routes/activitiesRoute.js';
import bookingRoute from './routes/bookingRoute.js'
const port = process.env.PORT ||8000;
dotenv.config();
connectDb();

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome home");
});

app.use('/api/auth', authRoutes);
app.use('/api/activities',activitiesRoute);
app.use('/api/activity',bookingRoute);


app.listen(port,console.log(`Server is running on port ${port}`));
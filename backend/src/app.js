import express from 'express';
import reportRoutes from './routes/report.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import cors from 'cors';
import './jobs/csvProcessor.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', reportRoutes);
app.use('/api', dashboardRoutes);

export default app;

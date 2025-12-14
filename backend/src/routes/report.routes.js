import express from 'express';
import { submitReport } from '../controllers/report.controller.js';
import { uploadCSV, csvUploadMiddleware } from '../controllers/upload.controller.js';
import { getJobStatus } from '../controllers/job.controller.js';

const router = express.Router();

router.post('/report', submitReport);
router.post('/reports/upload', csvUploadMiddleware, uploadCSV);
router.get('/job-status/:jobId', getJobStatus);

export default router;

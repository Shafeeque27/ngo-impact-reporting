import multer from 'multer';
import { reportQueue } from '../queues/report.queue.js';
import Job from '../models/Job.js';

const upload = multer({ dest: 'uploads/' });
export const csvUploadMiddleware = upload.single('file');

export const uploadCSV = async (req, res) => {
    try {
        const job = await reportQueue.add('process', { filePath: req.file.path });

        await Job.create({ jobId: String(job.id), status: 'pending' });

        res.json({ job_id: job.id });
    } catch (error) {
        res.json({ message: error.message });
    }
};

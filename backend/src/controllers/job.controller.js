import Job from '../models/Job.js';

export const getJobStatus = async (req, res) => {
    try {
        const job = await Job.findOne({ jobId: req.params.jobId });
        res.json(job);
    } catch (error) {
        res.json({ message: error.message });
    }
};

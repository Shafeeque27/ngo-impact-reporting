import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
    {
        jobId: { type: String, required: true, index: true },
        status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
        total: Number,
        success: Number,
        failed: Number,
        errors: [String],
    },
    { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;

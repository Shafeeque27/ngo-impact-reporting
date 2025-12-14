import { Worker } from 'bullmq';
import fs from 'fs';
import csv from 'csv-parser';
import Report from '../models/Report.js';
import Job from '../models/Job.js';
import { redisConnection } from '../confiq/redis.js';

new Worker(
    'csv-reports',
    async (job) => {
        let jobRecord;

        try {
            // 1. Find job record
            jobRecord = await Job.findOne({ jobId: String(job.id) });
            if (!jobRecord) throw new Error('Job record not found');

            // 2. Mark as processing
            jobRecord.status = 'processing';
            await jobRecord.save();

            let success = 0;
            let failed = 0;
            const errors = [];

            // 3. Read CSV into memory safely
            const rows = [];
            await new Promise((resolve, reject) => {
                fs.createReadStream(job.data.filePath)
                    .pipe(csv())
                    .on('data', (row) => rows.push(row))
                    .on('end', resolve)
                    .on('error', reject);
            });

            // 4. Process rows one by one
            for (const row of rows) {
                try {
                    await Report.updateOne({ ngoId: row.ngoId, month: row.month }, row, { upsert: true });
                    success++;
                } catch (err) {
                    failed++;
                    errors.push(err.message);
                }
            }

            // 5. Mark job as completed
            jobRecord.status = 'completed';
            jobRecord.total = success + failed;
            jobRecord.success = success;
            jobRecord.failed = failed;
            jobRecord.errors = errors;

            await jobRecord.save();
        } catch (error) {
            if (jobRecord) {
                jobRecord.status = 'failed';
                jobRecord.errors = jobRecord.errors || [];
                jobRecord.errors.push(error.message);
                await jobRecord.save();
            }
            throw error;
        }
    },
    { connection: redisConnection }
);

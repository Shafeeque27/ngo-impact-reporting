import { Queue } from 'bullmq';
import { redisConnection } from '../confiq/redis.js';

export const reportQueue = new Queue('csv-reports', {
    connection: redisConnection,
});

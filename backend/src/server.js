import 'dotenv/config';

import app from './app.js';
import { connectDB } from './confiq/db.js';

const startServer = async () => {
    await connectDB();
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running`);
    });
};

startServer();

import {config} from 'dotenv';
import path from 'path';
config({ path: path.join(process.cwd(), '.env') });
import {createHttpServer} from './app';
import { ChangeStreamClientCode } from '../cdc/client_code';
import mongoose from 'mongoose';
import env from './utils/env';
import { connectRedis } from '../../lib/redis';

async function start() {
    await mongoose.connect(env.MONGO_URI);
    const redisClient = await connectRedis();
    const server = createHttpServer(redisClient);

    const changeStreamClientCode = new ChangeStreamClientCode(redisClient);
    await changeStreamClientCode.start();
    server.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`);
    });

    process.on('SIGINT', () => {
        // redisClient.quit();

        // Avoid connection leak.
        mongoose.connection.close();
        process.exit(0);
    });
}

start().catch((err) => {
    console.error(err);
    process.exit(1);
});
import { RedisSink } from './sink/redis_sink';
import { PostSource } from './source/post_source';
import { GetFollower } from './operator/get_follower';
import { IOperator, Pipeline } from './pipeline';
import { createClient } from 'redis';

class ChangeStreamClientCode {
    redisClient: ReturnType<typeof createClient>;

    constructor(redisClient: ReturnType<typeof createClient>) {
        this.redisClient = redisClient;
    }

    async start() {
        const postSource = new PostSource();
        const redisSink = new RedisSink(this.redisClient);
        const operators : IOperator[] = [];
        const getFollower = new GetFollower();
        operators.push(getFollower);
        const pipeline = new Pipeline(redisSink, postSource, operators);
        pipeline.run();
    }
}

export {
   ChangeStreamClientCode,
}
import { ISink } from '../sink';

class LogSink implements ISink {
    async save(data: any) : Promise<void> {
        console.log(data);
    }
}

export {
    LogSink,
}
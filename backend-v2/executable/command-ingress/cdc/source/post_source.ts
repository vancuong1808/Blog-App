import EventEmitter from 'events';
import Post from '../../../../internal/model/post';
import { ISource } from '../source';

class PostSource implements ISource {
    async get(): Promise<EventEmitter> {
        const eventEmitter = new EventEmitter();

        Post.watch()
            .on('change', (stream : any) => {
                eventEmitter.emit('change', stream);
            });

        return eventEmitter;
    }
}

export {
    PostSource
};

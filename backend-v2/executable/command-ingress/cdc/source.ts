import EventEmitter from 'events';

interface ISource {
  get: () => Promise<EventEmitter>;
}

export {
  ISource,
}
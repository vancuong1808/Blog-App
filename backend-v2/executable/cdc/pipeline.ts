import { ISink } from './sink';
import { ISource } from './source';

type Transformer = (data :any) => Promise<any>; 

interface IOperator {
    run : (data : any) => Promise<any>;
}

class Pipeline implements IOperator {
    source : ISource;
    sink : ISink;
    operators : IOperator[];

    constructor(sink : ISink, source : ISource, operators : IOperator[]) {
        this.source = source;
        this.sink = sink;
        this.operators = operators;
    }

    async run() {
        const eventEmitter = await this.source.get();

        eventEmitter.on('change', async (data) => {
            for (const operator of this.operators) {
                const result = await operator.run(data);
                if (!result) {
                    return;
                }
                console.log(result);
                await this.sink.save(result);
            }
        });

        console.log('Pipeline started');
    }
}

export {
    Pipeline,
    Transformer,
    IOperator,
}
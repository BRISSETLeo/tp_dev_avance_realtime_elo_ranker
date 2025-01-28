import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class AppService {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    getEventEmitter(): EventEmitter2;
    notifyObservers(player: any): void;
}

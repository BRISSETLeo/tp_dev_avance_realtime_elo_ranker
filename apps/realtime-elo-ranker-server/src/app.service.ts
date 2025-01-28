import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {

  constructor(private readonly eventEmitter: EventEmitter2){}

  getEventEmitter() {
    return this.eventEmitter;
  }

  notifyObservers(player: any) {
    this.eventEmitter.emit('RankingUpdate', player);
  }

}

import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
   
  players: any[] = [];
  matches: any[] = [];
  observers: any[] = [];

  getRankingUpdates(): Observable<any> {
    return new Observable(observer => {
      this.observers.push(observer);
      observer.next(this.players);
      return () => {
        this.observers = this.observers.filter(obs => obs !== observer);
      };
    });
  }

  notifyObservers(player: any) {
    this.observers.forEach(obs => obs.next({type: "RankingUpdate", player: player}));
  }
}

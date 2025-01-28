import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Player } from './models/player.entity';
import { Match } from './models/match.entity';

@Injectable()
export class AppService {

  observers: any[] = [];

  async getMatches(): Promise<string> {
    const matches = await Match.find();
    return JSON.stringify(matches);
  }

  async addMatch(match: any): Promise<any> {
    const newMatch = new Match();
    newMatch.winner = match.winner;
    newMatch.loser = match.loser;
    await newMatch.save();
  }

  async getPlayers(): Promise<string> {
    const players = await Player.find({ order: { rank: 'DESC' } });
    return JSON.stringify(players);
  }

  async getAllPlayers(): Promise<{ id: string, rank: number }[]> {
    const players = await Player.find({ order: { rank: 'DESC' } });
    return players.map(player => ({ id: player.id, rank: player.rank }));
  }

  async getPlayer(id: string): Promise<Player | undefined> {
    const player = await Player.findOne({ where: { id: id } });
    return player || undefined;
  }

  async addPlayer(player: any): Promise<any> {
    await Player.insert(player);
  }

  async updatePlayer(player: any): Promise<any> {
    await Player.update(player.id, player);
  }

  getRankingUpdates(): Observable<any> {
    return new Observable(observer => {
      this.observers.push(observer);
      Player.find({ order: { rank: 'DESC' } }).then(players => {
        observer.next(players);
      });
      return () => {
        this.observers = this.observers.filter(obs => obs !== observer);
      };
    });
  }

  notifyObservers(player: any) {
    this.observers.forEach(obs => obs.next({type: "RankingUpdate", player: player}));
  }
}

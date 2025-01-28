import { Injectable } from '@nestjs/common';
import { Player } from '../models/player.entity';

@Injectable()
export class PlayerService {

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

}

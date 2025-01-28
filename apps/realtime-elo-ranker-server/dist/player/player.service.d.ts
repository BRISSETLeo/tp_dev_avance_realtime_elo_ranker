import { Player } from 'src/models/player.entity';
export declare class PlayerService {
    getPlayers(): Promise<string>;
    getAllPlayers(): Promise<{
        id: string;
        rank: number;
    }[]>;
    getPlayer(id: string): Promise<Player | undefined>;
    addPlayer(player: any): Promise<any>;
    updatePlayer(player: any): Promise<any>;
}

import { Observable } from 'rxjs';
import { Player } from './models/player.entity';
export declare class AppService {
    observers: any[];
    getMatches(): Promise<string>;
    addMatch(match: any): Promise<any>;
    getPlayers(): Promise<string>;
    getAllPlayers(): Promise<{
        id: string;
        rank: number;
    }[]>;
    getPlayer(id: string): Promise<Player | undefined>;
    addPlayer(player: any): Promise<any>;
    updatePlayer(player: any): Promise<any>;
    getRankingUpdates(): Observable<any>;
    notifyObservers(player: any): void;
}

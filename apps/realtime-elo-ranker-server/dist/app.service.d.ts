import { Observable } from 'rxjs';
export declare class AppService {
    players: any[];
    matches: any[];
    observers: any[];
    getRankingUpdates(): Observable<any>;
    notifyObservers(player: any): void;
}

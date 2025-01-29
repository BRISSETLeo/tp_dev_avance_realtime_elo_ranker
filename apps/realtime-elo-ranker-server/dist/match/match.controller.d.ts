import { AppService } from '../app.service';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
export declare class MatchController {
    private readonly appService;
    private readonly matchService;
    private readonly playerService;
    constructor(appService: AppService, matchService: MatchService, playerService: PlayerService);
    getAll(): Promise<string>;
    publishMatchResult(matchResult: {
        winner: string;
        loser: string;
        draw: boolean;
    }): Promise<{
        ok: boolean;
        code: number;
        message: string;
        winner?: undefined;
        loser?: undefined;
    } | {
        ok: boolean;
        code: number;
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
        message?: undefined;
    }>;
}

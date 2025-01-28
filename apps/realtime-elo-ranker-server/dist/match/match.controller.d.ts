import { AppService } from 'src/app.service';
export declare class MatchController {
    private readonly appService;
    constructor(appService: AppService);
    getAll(): Promise<string>;
    publishMatchResult(matchResult: {
        winner: string;
        loser: string;
        draw: boolean;
    }): Promise<{
        ok: boolean;
        code: number;
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
    }>;
}

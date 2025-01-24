import { AppService } from 'src/app.service';
export declare class MatchController {
    private readonly appService;
    constructor(appService: AppService);
    getAll(): string;
    publishMatchResult(matchResult: {
        winner: string;
        loser: string;
        draw: boolean;
    }): {
        ok: boolean;
        code: number;
        winner: {
            id: string;
            rank: any;
        };
        loser: {
            id: string;
            rank: any;
        };
    };
}

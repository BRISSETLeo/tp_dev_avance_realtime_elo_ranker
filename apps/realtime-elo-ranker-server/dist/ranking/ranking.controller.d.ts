import { PlayerService } from 'src/player/player.service';
export declare class RankingController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    getRanking(): Promise<string>;
}

import { AppService } from 'src/app.service';
export declare class RankingController {
    private readonly appService;
    constructor(appService: AppService);
    getRanking(): Promise<string>;
}

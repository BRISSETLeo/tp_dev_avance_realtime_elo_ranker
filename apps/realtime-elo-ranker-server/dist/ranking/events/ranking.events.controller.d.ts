import { Observable } from 'rxjs';
import { AppService } from 'src/app.service';
export declare class RankingEventsController {
    private readonly appService;
    constructor(appService: AppService);
    subscribeToRankingUpdates(): Observable<MessageEvent>;
}

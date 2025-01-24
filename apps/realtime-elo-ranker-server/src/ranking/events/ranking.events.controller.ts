import { Controller, Get, Sse } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AppService } from 'src/app.service';

@Controller('api/ranking/events')
export class RankingEventsController {

    constructor(private readonly appService: AppService) {}

    @Sse()
    @Get()
    subscribeToRankingUpdates(): Observable<MessageEvent> {
        return this.appService.getRankingUpdates().pipe(
            map((update: any) => ({ data: JSON.stringify(update) } as MessageEvent<any>))
        );
    }

}

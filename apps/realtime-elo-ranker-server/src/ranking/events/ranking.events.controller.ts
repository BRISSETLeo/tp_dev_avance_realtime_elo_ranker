import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from '../../app.service';

@Controller('api/ranking/events')
export class RankingEventsController {
    constructor(private readonly appService: AppService) {}

    @Sse()
    subscribeToRankingUpdates(): Observable<MessageEvent> {
        return new Observable(observer => {
            const rankingUpdates = this.appService.getEventEmitter();

            rankingUpdates.on('RankingUpdate', (update) => {
                observer.next(new MessageEvent('message', {
                    data: {
                        type: 'RankingUpdate',
                        player: {
                            id: update.id,
                            rank: update.rank,
                        },
                    },
                }));
            });

            rankingUpdates.on('error', (err) => {
                observer.error(err);
            });

            return () => {
                rankingUpdates.removeAllListeners('RankingUpdate');
                rankingUpdates.removeAllListeners('error');
            };
        });
    }
}

import { Controller, Get, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('api/match')
export class MatchController {
    
    constructor(private readonly appService: AppService) {}

    @Get()
    getAll(): string {
        return JSON.stringify(this.appService.matches);
    }

    @Post()
    publishMatchResult(@Body() matchResult: { winner: string, loser: string, draw: boolean }) {
        const { winner, loser, draw } = matchResult;

        const winnerPlayer = this.appService.players.find(player => player.id === winner);
        const loserPlayer = this.appService.players.find(player => player.id === loser);

        if (!winnerPlayer || !loserPlayer) {
            throw new HttpException({
                ok: false,
                code: 422,
                message: 'Un des deux joueurs n\'existe pas'
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const K = 32;

        const expectedScoreWinner = 1 / (1 + Math.pow(10, (loserPlayer.rank - winnerPlayer.rank) / 400));
        const expectedScoreLoser = 1 / (1 + Math.pow(10, (winnerPlayer.rank - loserPlayer.rank) / 400));

        if (!draw) {
            winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (1 - expectedScoreWinner));
            loserPlayer.rank = Math.round(loserPlayer.rank + K * (0 - expectedScoreLoser));
        } else {
            winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (0.5 - expectedScoreWinner));
            loserPlayer.rank = Math.round(loserPlayer.rank + K * (0.5 - expectedScoreLoser));
        }

        this.appService.matches.push({winner: winnerPlayer, loser: loserPlayer});
        this.appService.notifyObservers(winnerPlayer);
        return {
            ok: true,
            code: 200,
            winner: {
                id: winner,
                rank: winnerPlayer.rank
            },
            loser: {
                id: loser,
                rank: loserPlayer.rank
            }
        };
    }
}

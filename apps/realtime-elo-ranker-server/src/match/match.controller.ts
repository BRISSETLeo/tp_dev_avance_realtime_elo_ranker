import { Controller, Get, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('api/match')
export class MatchController {
    
    constructor(private readonly appService: AppService) {}

    @Get()
    async getAll(): Promise<string> {
        return await this.appService.getMatches();
    }

    @Post()
    async publishMatchResult(@Body() matchResult: { winner: string, loser: string, draw: boolean }) {
        const { winner, loser, draw } = matchResult;

        if(draw) {
            return {
                ok: true,
                code: 200
            }
        }

        const winnerPlayer = await this.appService.getPlayer(winner);
        const loserPlayer = await this.appService.getPlayer(loser);

        if (!winnerPlayer || !loserPlayer) {
            throw new HttpException({
                ok: false,
                code: 422,
                message: 'Un des deux joueurs n\'existe pas'
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const K = 32;

        

        if (!draw) {
            const expectedScoreWinner = 1 / (1 + Math.pow(10, (loserPlayer.rank - winnerPlayer.rank) / 400));
            const expectedScoreLoser = 1 / (1 + Math.pow(10, (winnerPlayer.rank - loserPlayer.rank) / 400));
            
            winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (1 - expectedScoreWinner));
            loserPlayer.rank = Math.round(loserPlayer.rank + K * (0 - expectedScoreLoser));
        } 

        await this.appService.updatePlayer(winnerPlayer);
        await this.appService.updatePlayer(loserPlayer);

        this.appService.addMatch({winner: winnerPlayer.id, loser: loserPlayer.id});
        this.appService.notifyObservers(winnerPlayer);
        this.appService.notifyObservers(loserPlayer);
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

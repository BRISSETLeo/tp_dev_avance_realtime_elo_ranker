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

        if (!draw) {
            winnerPlayer.rank += 1;
            loserPlayer.rank -= 1;
        }

        this.appService.matches.push(matchResult);

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

import { Controller, Get, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from '../app.service';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';

@Controller('api/match')
export class MatchController {
    
    constructor(private readonly appService: AppService, private readonly matchService: MatchService, private readonly playerService: PlayerService) {}

    @Get()
    async getAll(): Promise<string> {
        return await this.matchService.getMatches();
    }

    @Post()
    async publishMatchResult(@Body() matchResult: { winner: string, loser: string, draw: boolean }) {
        const { winner, loser, draw } = matchResult;

        if(draw) {
            return {
                ok: true,
                code: 200,
                message: 'Match nul'
            }
        }else if(!winner || !loser) {
                return {
                    ok: false,
                    code: 400,
                    message: 'Il manque un joueur'
                }
            }

        const winnerPlayer = await this.playerService.getPlayer(winner);
        const loserPlayer = await this.playerService.getPlayer(loser);

        if (!winnerPlayer || !loserPlayer) {
            return {
                ok: false,
                code: 400,
                message: 'Un des joueurs n\'existe pas'
            }
        }

        const K = 32;

        
        const expectedScoreWinner = 1 / (1 + Math.pow(10, (loserPlayer.rank - winnerPlayer.rank) / 400));
        const expectedScoreLoser = 1 / (1 + Math.pow(10, (winnerPlayer.rank - loserPlayer.rank) / 400));
            
        winnerPlayer.rank += K * (1 - expectedScoreWinner);
        loserPlayer.rank += K * (0 - expectedScoreLoser);
            
        winnerPlayer.rank = Math.round(winnerPlayer.rank);
        loserPlayer.rank = Math.round(loserPlayer.rank);
        
        await this.playerService.updatePlayer(winnerPlayer);
        await this.playerService.updatePlayer(loserPlayer);

        this.matchService.addMatch({winner: winnerPlayer.id, loser: loserPlayer.id});

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

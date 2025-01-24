import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('api/ranking')
export class RankingController {

    constructor(private readonly appService: AppService) {}

    @Get()
    getRanking() {
        const players = this.appService.players; // Assume this method fetches the player rankings
        if (players.length === 0) {
            throw new HttpException({
                ok: false,
                code: 404,
                message: 'Le classement n\'est pas disponible car aucun joueur n\'existe',
            }, HttpStatus.NOT_FOUND);
        }
        return players.map(player => ({
            id: player.id,
            rank: player.rank,
        }));
    }
}

import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PlayerService } from '../player/player.service';

@Controller('api/ranking')
export class RankingController {

    constructor(private readonly playerService: PlayerService) {}

    @Get()
    async getRanking() {
        const players = await this.playerService.getPlayers();
        if (players.length === 0) {
            throw new HttpException({
                ok: false,
                code: 404,
                message: 'Le classement n\'est pas disponible car aucun joueur n\'existe',
            }, HttpStatus.NOT_FOUND);
        }
        return players;
    }
}

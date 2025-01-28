import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { PlayerService } from './player.service';

@Controller('api/player')
export class PlayerController {

    constructor(private readonly playerService: PlayerService, private readonly appService: AppService) {}

    @Get()
    async getAll(): Promise<string> {
        return await this.playerService.getPlayers();
    }

    @Post()
    async addPlayer(@Body() body: any): Promise<any> {
        if (!body.id) {
            return {
                ok: false,
                code: 400,
                message: "L'identifiant du joueur n'est pas valide"
            };
        }

        const playerExists = await this.playerService.getPlayer(body.id);
        if (playerExists) {
            return {
                ok: false,
                code: 409,
                message: "Le joueur existe déjà"
            };
        }

        if(!body.rank) {
            body.rank = 1000;
        }

        const players = await this.playerService.getAllPlayers();
        const totalRank = players.reduce((sum, player) => sum + player.rank, 0);
        const averageRank = players.length ? totalRank / players.length : 0;
        body.rank = body.rank || averageRank;
        
        this.playerService.addPlayer(body);
        this.appService.notifyObservers(body);

        return {
            ok: true,
            code: 200,
            message: 'Joueur créé avec succès'
        };
    }
}

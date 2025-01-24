import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { ok } from 'assert';

@Controller('api/player')
export class PlayerController {

    constructor(private readonly appService: AppService) {}

    @Get()
    getAll(): string {
        return JSON.stringify(this.appService.players);
    }

    @Post()
    addPlayer(@Body() body: any): any {
        if (!body.id) {
            return {
                ok: false,
                code: 400,
                message: "L'identifiant du joueur n'est pas valide"
            };
        }

        const playerExists = this.appService.players.some(player => player.id === body.id);
        if (playerExists) {
            return {
                ok: false,
                code: 409,
                message: "Le joueur existe déjà"
            };
        }

        if(!body.rank) {
            body.rank = 0;
        }

        this.appService.players.push(body);
        return {
            ok: true,
            code: 200,
            message: 'Joueur créé avec succès'
        };
    }
}

import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('api/player')
export class PlayerController {

    @Get()
    getAll(): string {
        return 'Tous les exemples';
    }

    @Post()
    createExample(@Body() body: any): string {
        console.log('Données reçues:', body); // Affiche les données dans la console du serveur
        return `Données reçues: ${JSON.stringify(body)}`;
    }

}

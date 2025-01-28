import { AppService } from '../app.service';
import { PlayerService } from './player.service';
export declare class PlayerController {
    private readonly playerService;
    private readonly appService;
    constructor(playerService: PlayerService, appService: AppService);
    getAll(): Promise<string>;
    addPlayer(body: any): Promise<any>;
}

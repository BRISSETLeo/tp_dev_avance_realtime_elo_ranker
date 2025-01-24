import { AppService } from '../app.service';
export declare class PlayerController {
    private readonly appService;
    constructor(appService: AppService);
    getAll(): string;
    addPlayer(body: any): any;
}

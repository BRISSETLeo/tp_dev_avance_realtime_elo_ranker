import { AppService } from '../app.service';
export declare class PlayerController {
    private readonly appService;
    constructor(appService: AppService);
    getAll(): Promise<string>;
    addPlayer(body: any): Promise<any>;
}

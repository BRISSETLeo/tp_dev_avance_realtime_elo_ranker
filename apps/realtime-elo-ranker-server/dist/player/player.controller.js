"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const player_service_1 = require("./player.service");
let PlayerController = class PlayerController {
    constructor(playerService, appService) {
        this.playerService = playerService;
        this.appService = appService;
    }
    async getAll() {
        return await this.playerService.getPlayers();
    }
    async addPlayer(body) {
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
        if (!body.rank) {
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
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "addPlayer", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)('api/player'),
    __metadata("design:paramtypes", [player_service_1.PlayerService, app_service_1.AppService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map
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
let PlayerController = class PlayerController {
    constructor(appService) {
        this.appService = appService;
    }
    getAll() {
        return JSON.stringify(this.appService.players);
    }
    addPlayer(body) {
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
        if (!body.rank) {
            body.rank = 1000;
        }
        const totalRank = this.appService.players.reduce((sum, player) => sum + player.rank, 0);
        const averageRank = this.appService.players.length ? totalRank / this.appService.players.length : 0;
        body.rank = body.rank || averageRank;
        this.appService.players.push(body);
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
    __metadata("design:returntype", String)
], PlayerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], PlayerController.prototype, "addPlayer", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)('api/player'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map
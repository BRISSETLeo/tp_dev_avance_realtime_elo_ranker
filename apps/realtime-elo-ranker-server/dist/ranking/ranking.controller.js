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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
let RankingController = class RankingController {
    constructor(appService) {
        this.appService = appService;
    }
    async getRanking() {
        const players = await this.appService.getPlayers();
        if (players.length === 0) {
            throw new common_1.HttpException({
                ok: false,
                code: 404,
                message: 'Le classement n\'est pas disponible car aucun joueur n\'existe',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return players;
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "getRanking", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)('api/ranking'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map
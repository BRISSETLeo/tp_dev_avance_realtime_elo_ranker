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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
let MatchController = class MatchController {
    constructor(appService) {
        this.appService = appService;
    }
    getAll() {
        return JSON.stringify(this.appService.matches);
    }
    publishMatchResult(matchResult) {
        const { winner, loser, draw } = matchResult;
        const winnerPlayer = this.appService.players.find(player => player.id === winner);
        const loserPlayer = this.appService.players.find(player => player.id === loser);
        if (!winnerPlayer || !loserPlayer) {
            throw new common_1.HttpException({
                ok: false,
                code: 422,
                message: 'Un des deux joueurs n\'existe pas'
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (!draw) {
            winnerPlayer.rank += 1;
            loserPlayer.rank -= 1;
        }
        this.appService.matches.push(matchResult);
        return {
            ok: true,
            code: 200,
            winner: {
                id: winner,
                rank: winnerPlayer.rank
            },
            loser: {
                id: loser,
                rank: loserPlayer.rank
            }
        };
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], MatchController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "publishMatchResult", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)('api/match'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], MatchController);
//# sourceMappingURL=match.controller.js.map
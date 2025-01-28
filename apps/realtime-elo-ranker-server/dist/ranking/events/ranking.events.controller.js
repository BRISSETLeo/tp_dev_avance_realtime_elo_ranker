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
exports.RankingEventsController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const app_service_1 = require("../../app.service");
let RankingEventsController = class RankingEventsController {
    constructor(appService) {
        this.appService = appService;
    }
    subscribeToRankingUpdates() {
        return new rxjs_1.Observable(observer => {
            const rankingUpdates = this.appService.getEventEmitter();
            rankingUpdates.on('RankingUpdate', (update) => {
                observer.next(new MessageEvent('message', {
                    data: {
                        type: 'RankingUpdate',
                        player: {
                            id: update.id,
                            rank: update.rank,
                        },
                    },
                }));
            });
            rankingUpdates.on('error', (err) => {
                observer.error(err);
            });
            return () => {
                rankingUpdates.removeAllListeners('RankingUpdate');
                rankingUpdates.removeAllListeners('error');
            };
        });
    }
};
exports.RankingEventsController = RankingEventsController;
__decorate([
    (0, common_1.Sse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], RankingEventsController.prototype, "subscribeToRankingUpdates", null);
exports.RankingEventsController = RankingEventsController = __decorate([
    (0, common_1.Controller)('api/ranking/events'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], RankingEventsController);
//# sourceMappingURL=ranking.events.controller.js.map
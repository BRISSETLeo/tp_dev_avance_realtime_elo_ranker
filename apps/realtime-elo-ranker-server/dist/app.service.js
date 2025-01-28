"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const player_entity_1 = require("./models/player.entity");
const match_entity_1 = require("./models/match.entity");
let AppService = class AppService {
    constructor() {
        this.observers = [];
    }
    async getMatches() {
        const matches = await match_entity_1.Match.find();
        return JSON.stringify(matches);
    }
    async addMatch(match) {
        const newMatch = new match_entity_1.Match();
        newMatch.winner = match.winner;
        newMatch.loser = match.loser;
        await newMatch.save();
    }
    async getPlayers() {
        const players = await player_entity_1.Player.find({ order: { rank: 'DESC' } });
        return JSON.stringify(players);
    }
    async getAllPlayers() {
        const players = await player_entity_1.Player.find({ order: { rank: 'DESC' } });
        return players.map(player => ({ id: player.id, rank: player.rank }));
    }
    async getPlayer(id) {
        const player = await player_entity_1.Player.findOne({ where: { id: id } });
        return player || undefined;
    }
    async addPlayer(player) {
        await player_entity_1.Player.insert(player);
    }
    async updatePlayer(player) {
        await player_entity_1.Player.update(player.id, player);
    }
    getRankingUpdates() {
        return new rxjs_1.Observable(observer => {
            this.observers.push(observer);
            player_entity_1.Player.find({ order: { rank: 'DESC' } }).then(players => {
                observer.next(players);
            });
            return () => {
                this.observers = this.observers.filter(obs => obs !== observer);
            };
        });
    }
    notifyObservers(player) {
        this.observers.forEach(obs => obs.next({ type: "RankingUpdate", player: player }));
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map
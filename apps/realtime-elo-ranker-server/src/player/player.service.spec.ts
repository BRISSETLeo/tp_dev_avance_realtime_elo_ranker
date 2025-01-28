import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Player } from '../models/player.entity';
import { InsertResult, UpdateResult } from 'typeorm';

describe('PlayerService', () => {
    let service: PlayerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlayerService],
        }).compile();

        service = module.get<PlayerService>(PlayerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getPlayers', () => {
        it('should return a list of players as a JSON string', async () => {
            const players = [{ id: '1', rank: 1 }, { id: '2', rank: 2 }];
            jest.spyOn(Player, 'find').mockResolvedValue(players as any);
            const result = await service.getPlayers();
            expect(result).toBe(JSON.stringify(players));
        });
    });

    describe('getAllPlayers', () => {
        it('should return a list of players with id and rank', async () => {
            const players = [{ id: '1', rank: 1 }, { id: '2', rank: 2 }];
            jest.spyOn(Player, 'find').mockResolvedValue(players as any);
            const result = await service.getAllPlayers();
            expect(result).toEqual(players);
        });
    });

    describe('getPlayer', () => {
        it('should return a player by id', async () => {
            const player = { id: '1', rank: 1 };
            jest.spyOn(Player, 'findOne').mockResolvedValue(player as any);
            const result = await service.getPlayer('1');
            expect(result).toEqual(player);
        });

        it('should return undefined if player not found', async () => {
            jest.spyOn(Player, 'findOne').mockResolvedValue(null);
            const result = await service.getPlayer('1');
            expect(result).toBeUndefined();
        });
    });

    describe('addPlayer', () => {
        it('should add a new player', async () => {
            const player = { id: '1', rank: 1 };
            jest.spyOn(Player, 'insert').mockResolvedValue({} as InsertResult);
            await service.addPlayer(player);
            expect(Player.insert).toHaveBeenCalledWith(player);
        });
    });

    describe('updatePlayer', () => {
        it('should update an existing player', async () => {
            const player = { id: '1', rank: 1 };
            jest.spyOn(Player, 'update').mockResolvedValue({} as UpdateResult);
            await service.updatePlayer(player);
            expect(Player.update).toHaveBeenCalledWith(player.id, player);
        });
    });
});
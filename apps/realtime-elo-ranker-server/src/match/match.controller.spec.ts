import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { AppService } from '../app.service';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
import { HttpException } from '@nestjs/common';

describe('MatchController', () => {
  let controller: MatchController;
  let appService: AppService;
  let matchService: MatchService;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: AppService,
          useValue: {
            notifyObservers: jest.fn(),
          },
        },
        {
          provide: MatchService,
          useValue: {
            getMatches: jest.fn().mockResolvedValue('[]'),
            addMatch: jest.fn(),
          },
        },
        {
          provide: PlayerService,
          useValue: {
            getPlayer: jest.fn(async (id: string) => {
              if (id === '1') return { id: '1', rank: 1000 };
              if (id === '2') return { id: '2', rank: 1000 };
              return null;
            }),
            updatePlayer: jest.fn(async (player: { id: string, rank: number }) => {
              if (player.id === '1') return { id: '1', rank: player.rank };
              if (player.id === '2') return { id: '2', rank: player.rank };
              return null;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    appService = module.get<AppService>(AppService);
    matchService = module.get<MatchService>(MatchService);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all matches', async () => {
    const result = await controller.getAll();
    expect(result).toBe('[]');
  });

  it('should publish match result with a draw', async () => {
    const result = await controller.publishMatchResult({ winner: '1', loser: '2', draw: true });
    expect(result).toEqual({ ok: true, code: 200 });
  });

  it('should throw an error if a player does not exist', async () => {
    await expect(controller.publishMatchResult({ winner: '1', loser: '3', draw: false })).rejects.toThrow(HttpException);
  });

  it('should publish match result and update ranks', async () => {
    const result = await controller.publishMatchResult({ winner: '1', loser: '2', draw: false });
    expect(result.ok).toBe(true);
    expect(result.code).toBe(200);
    expect(result.winner?.rank).not.toBe(1000);
    expect(result.loser?.rank).not.toBe(1000);
  });

  it('should call notifyObservers for both players', async () => {
    await controller.publishMatchResult({ winner: '1', loser: '2', draw: false });
    expect(appService.notifyObservers).toHaveBeenCalledTimes(2);
  });

  it('should call addMatch with correct parameters', async () => {
    await controller.publishMatchResult({ winner: '1', loser: '2', draw: false });
    expect(matchService.addMatch).toHaveBeenCalledWith({ winner: '1', loser: '2' });
  });

  it('should not update ranks if it is a draw', async () => {
    const winnerPlayer = await playerService.getPlayer('1');
    const loserPlayer = await playerService.getPlayer('2');
    await controller.publishMatchResult({ winner: '1', loser: '2', draw: true });
    expect(winnerPlayer?.rank).toBe(1000);
    expect(loserPlayer?.rank).toBe(1000);
  });

  it('should handle multiple matches correctly', async () => {
    await controller.publishMatchResult({ winner: '1', loser: '2', draw: false });
    await controller.publishMatchResult({ winner: '2', loser: '1', draw: false });
    const winnerPlayer = await playerService.getPlayer('1');
    const loserPlayer = await playerService.getPlayer('2');
    expect(winnerPlayer?.rank).toBe(1000);
    expect(loserPlayer?.rank).toBe(1000);
  });

  it('should handle edge case where both players have the same rank', async () => {
    playerService.getPlayer = jest.fn(async (id: string) => {
      if (id === '1') return { id: '1', rank: 1000, hasId: jest.fn(), save: jest.fn(), remove: jest.fn(), softRemove: jest.fn(), recover: jest.fn(), reload: jest.fn() };
      if (id === '2') return { id: '2', rank: 1000, hasId: jest.fn(), save: jest.fn(), remove: jest.fn(), softRemove: jest.fn(), recover: jest.fn(), reload: jest.fn() };
      return undefined;
    });
    const result = await controller.publishMatchResult({ winner: '1', loser: '2', draw: false });
    expect(result.winner?.rank).toBeGreaterThan(1000);
    expect(result.loser?.rank).toBeLessThan(1000);
  });

  it('should handle edge case where winner has much higher rank than loser', async () => {
    playerService.getPlayer = jest.fn(async (id: string) => {
      if (id === '1') return { id: '1', rank: 2000, hasId: jest.fn(), save: jest.fn(), remove: jest.fn(), softRemove: jest.fn(), recover: jest.fn(), reload: jest.fn() };
      if (id === '2') return { id: '2', rank: 1000, hasId: jest.fn(), save: jest.fn(), remove: jest.fn(), softRemove: jest.fn(), recover: jest.fn(), reload: jest.fn() };
      return undefined;
    });
    const result = await controller.publishMatchResult({ winner: '1', loser: '2', draw: false });
    expect(result.winner?.rank).toBe(2000);
    expect(result.loser?.rank).toBe(1000);
  });

  it('should handle edge case where loser has much higher rank than winner', async () => {
    playerService.getPlayer = jest.fn(async (id: string) => {
      if (id === '1') return { id: '1', rank: 1000, hasId: jest.fn(), save: jest.fn(), remove: jest.fn(), softRemove: jest.fn(), recover: jest.fn(), reload: jest.fn() };
      if (id === '2') return { id: '2', rank: 2000, hasId: jest.fn(), save: jest.fn(), remove: jest.fn(), softRemove: jest.fn(), recover: jest.fn(), reload: jest.fn() };
      return undefined;
    });
    const result = await controller.publishMatchResult({ winner: '1', loser: '2', draw: false });
    expect(result.winner?.rank).toBeGreaterThan(1000);
    expect(result.loser?.rank).toBeLessThan(2000);
  });
});

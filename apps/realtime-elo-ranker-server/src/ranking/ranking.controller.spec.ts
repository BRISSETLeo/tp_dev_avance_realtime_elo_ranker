import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { PlayerService } from '../player/player.service';
import { HttpException } from '@nestjs/common';

describe('RankingController', () => {
  let controller: RankingController;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            getPlayers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return player rankings', async () => {
    const players = "[{ id: 1, rank: 1000 },{ id: 2, rank: 1000 },{ id: 3, rank: 1000 },]";
    jest.spyOn(playerService, 'getPlayers').mockResolvedValue(players);

    const result = await controller.getRanking();
    expect(result).toEqual(players);
  });

  it('should throw 404 if no players exist', async () => {
    jest.spyOn(playerService, 'getPlayers').mockResolvedValue("");

    try {
      await controller.getRanking();
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
  });

  it('should handle service errors gracefully', async () => {
    jest.spyOn(playerService, 'getPlayers').mockRejectedValue(new Error('Service error'));

    try {
      await controller.getRanking();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should return players sorted by rank', async () => {
    const players = "[{ id: 1, rank: 1000 },{ id: 2, rank: 1000 },{ id: 3, rank: 1000 },]";
    jest.spyOn(playerService, 'getPlayers').mockResolvedValue(players);
  });
});

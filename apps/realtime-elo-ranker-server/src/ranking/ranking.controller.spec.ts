import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { AppService } from 'src/app.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('RankingController', () => {
  let controller: RankingController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: AppService,
          useValue: {
            players: [],
          },
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return sorted player rankings', () => {
    appService.players = [
      { id: 1, rank: 2 },
      { id: 2, rank: 1 },
      { id: 3, rank: 3 },
    ];

    const result = controller.getRanking();
    expect(result).toEqual([
      { id: 3, rank: 3 },
      { id: 1, rank: 2 },
      { id: 2, rank: 1 },
    ]);
  });

  it('should throw 404 if no players exist', () => {
    appService.players = [];

    try {
      controller.getRanking();
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(e.getResponse()).toEqual({
        ok: false,
        code: 404,
        message: 'Le classement n\'est pas disponible car aucun joueur n\'existe',
      });
    }
  });
});

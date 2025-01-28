import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { AppService } from 'src/app.service';
import { HttpException } from '@nestjs/common';

describe('MatchController', () => {
  let controller: MatchController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: AppService,
          useValue: {
            matches: [],
            players: [
              { id: '1', rank: 1000 },
              { id: '2', rank: 1000 },
            ],
            notifyObservers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all matches', () => {
    expect(controller.getAll()).toBe(JSON.stringify(appService.matches));
  });

  it('should publish match result with a draw', () => {
    const result = controller.publishMatchResult({ winner: '1', loser: '2', draw: true });
    expect(result).toEqual({ ok: true, code: 200 });
  });

  it('should throw an error if a player does not exist', () => {
    expect(() => {
      controller.publishMatchResult({ winner: '1', loser: '3', draw: false });
    }).toThrow(HttpException);
  });

  it('should publish match result and update ranks', () => {
    const result = controller.publishMatchResult({ winner: '1', loser: '2', draw: false });
    expect(result.ok).toBe(true);
    expect(result.code).toBe(200);
    expect(result.winner?.rank).not.toBe(1000);
    expect(result.loser?.rank).not.toBe(1000);
  });
});
